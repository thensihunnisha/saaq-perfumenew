const express = require("express");
const pool = require("../config/db");
const requireAdminSecret = require("../middleware/adminSecret");

const router = express.Router();

router.get("/", requireAdminSecret, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
          c.id,
          c.name,
          c.email,
          c.phone,
          c.created_at,
          (
            SELECT COUNT(*)
            FROM orders o
            WHERE o.customer_id = c.id
          ) AS order_count,
          (
            SELECT COALESCE(SUM(o.total_amount), 0)
            FROM orders o
            WHERE o.customer_id = c.id
              AND o.payment_status = 'paid'
              AND o.status <> 'cancelled'
          ) AS total_spent
       FROM customers c
       ORDER BY c.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load customers",
    });
  }
});

router.get("/:id", requireAdminSecret, async (req, res) => {
  try {
    const [customers] = await pool.query(
      `SELECT
          c.id,
          c.name,
          c.email,
          c.phone,
          c.address,
          c.city,
          c.state,
          c.country,
          c.postal_code,
          c.created_at,
          (
            SELECT COUNT(*)
            FROM orders o
            WHERE o.customer_id = c.id
          ) AS order_count,
          (
            SELECT COALESCE(SUM(o.total_amount), 0)
            FROM orders o
            WHERE o.customer_id = c.id
              AND o.payment_status = 'paid'
              AND o.status <> 'cancelled'
          ) AS total_spent
       FROM customers c
       WHERE c.id = ?`,
      [req.params.id]
    );

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const [orders] = await pool.query(
      `SELECT id, total_amount, status, payment_status, created_at
       FROM orders
       WHERE customer_id = ?
       ORDER BY created_at DESC`,
      [req.params.id]
    );

    res.json({
      ...customers[0],
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load customer",
    });
  }
});

module.exports = router;
