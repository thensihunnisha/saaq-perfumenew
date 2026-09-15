const express = require("express");
const pool = require("../config/db");
const requireAdminSecret = require("../middleware/adminSecret");

const router = express.Router();

function parseProductInput(body) {
  const name = String(body?.name ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const collectionRaw = String(body?.collection ?? "").trim();
  const image = String(body?.image ?? "").trim();
  const description = String(body?.description ?? "").trim();
  const price = Number(body?.price);
  const stockValue = body?.stock;
  const stock =
    stockValue === undefined || stockValue === null || stockValue === ""
      ? 0
      : Number(stockValue);

  let collection = null;
  if (collectionRaw) {
    collection = collectionRaw.toLowerCase() === "gems" ? "Gems" : "Takeoff";
  }

  const errors = [];

  if (!name) {
    errors.push("name");
  }

  if (!category) {
    errors.push("category");
  }

  if (!Number.isFinite(price) || price < 0) {
    errors.push("price");
  }

  if (!Number.isInteger(stock) || stock < 0) {
    errors.push("stock");
  }

  return {
    errors,
    value: {
      name,
      category,
      collection,
      price,
      image: image || null,
      description: description || null,
      stock,
    },
  };
}

router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load products",
    });
  }
});

router.post("/", requireAdminSecret, async (req, res) => {
  const { errors, value } = parseProductInput(req.body);

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO products
        (name, category, collection, price, image, description, stock)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        value.name,
        value.category,
        value.collection,
        value.price,
        value.image,
        value.description,
        value.stock,
      ]
    );

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create product",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load product",
    });
  }
});

router.put("/:id", requireAdminSecret, async (req, res) => {
  const { errors, value } = parseProductInput(req.body);

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
  }

  try {
    const [existing] = await pool.query("SELECT id FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await pool.query(
      `UPDATE products
       SET name = ?, category = ?, collection = ?, price = ?, image = ?, description = ?, stock = ?
       WHERE id = ?`,
      [
        value.name,
        value.category,
        value.collection,
        value.price,
        value.image,
        value.description,
        value.stock,
        req.params.id,
      ]
    );

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update product",
    });
  }
});

router.delete("/:id", requireAdminSecret, async (req, res) => {
  try {
    const [existing] = await pool.query("SELECT id FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete product",
    });
  }
});

module.exports = router;
