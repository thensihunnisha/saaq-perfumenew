const express = require("express");
const pool = require("../config/db");
const requireAdminSecret = require("../middleware/adminSecret");
const { countProductsUsing } = require("../lib/productUsage");

const router = express.Router();

function parseName(body) {
  const name = String(body?.name ?? "").trim();
  return name;
}

router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load categories",
    });
  }
});

router.post("/", requireAdminSecret, async (req, res) => {
  const name = parseName(req.body);

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to create category",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load category",
    });
  }
});

router.put("/:id", requireAdminSecret, async (req, res) => {
  const name = parseName(req.body);

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await pool.query("UPDATE categories SET name = ? WHERE id = ?", [
      name,
      req.params.id,
    ]);

    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to update category",
    });
  }
});

router.delete("/:id", requireAdminSecret, async (req, res) => {
  try {
    const [existing] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const inUse = await countProductsUsing(pool, {
      idColumn: "category_id",
      nameColumn: "category",
      id: existing[0].id,
      name: existing[0].name,
    });

    if (inUse > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This category cannot be deleted because products are using it.",
      });
    }

    await pool.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete category",
    });
  }
});

module.exports = router;
