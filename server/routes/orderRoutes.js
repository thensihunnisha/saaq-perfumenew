const express = require("express");
const pool = require("../config/db");
const requireAdminSecret = require("../middleware/adminSecret");
const {
  CheckoutError,
  createStorefrontOrder,
  ensureOrderColumns,
} = require("../lib/createStorefrontOrder");

const router = express.Router();

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

async function getOrderById(id) {
  const [orders] = await pool.query(
    `SELECT
        o.id,
        o.customer_id,
        o.total_amount,
        o.status,
        o.payment_status,
        o.shipping_address,
        o.channel,
        o.notes,
        o.created_at,
        o.updated_at,
        c.name AS customer_name,
        c.email AS customer_email,
        c.phone AS customer_phone,
        c.address AS customer_address,
        c.city AS customer_city,
        c.state AS customer_state,
        c.country AS customer_country,
        c.postal_code AS customer_postal_code
     FROM orders o
     LEFT JOIN customers c ON c.id = o.customer_id
     WHERE o.id = ?`,
    [id]
  );

  if (!orders.length) {
    return null;
  }

  const order = orders[0];
  const [items] = await pool.query(
    `SELECT
        oi.id,
        oi.product_id,
        oi.quantity,
        oi.price,
        oi.subtotal,
        p.name AS product_name,
        p.image AS product_image,
        p.collection AS product_collection
     FROM order_items oi
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?
     ORDER BY oi.id ASC`,
    [id]
  );
  const [payments] = await pool.query(
    `SELECT id, payment_method, transaction_id, amount, status, created_at
     FROM payments
     WHERE order_id = ?
     ORDER BY created_at DESC`,
    [id]
  );

  return {
    id: order.id,
    customer_id: order.customer_id,
    total_amount: order.total_amount,
    status: order.status,
    payment_status: order.payment_status,
    shipping_address: order.shipping_address,
    channel: order.channel || "checkout",
    notes: order.notes || null,
    created_at: order.created_at,
    updated_at: order.updated_at,
    customer: order.customer_id
      ? {
          id: order.customer_id,
          name: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          address: order.customer_address,
          city: order.customer_city,
          state: order.customer_state,
          country: order.customer_country,
          postal_code: order.customer_postal_code,
        }
      : null,
    items,
    payments,
  };
}

router.post("/", async (req, res) => {
  try {
    const order = await createStorefrontOrder(req.body);
    res.status(201).json({
      success: true,
      orderId: order.orderId,
    });
  } catch (error) {
    if (error instanceof CheckoutError) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Unable to create order", error);
    res.status(500).json({
      success: false,
      message: "Unable to place order.",
    });
  }
});

router.get("/:id/confirmation", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
          o.id,
          o.total_amount,
          o.status,
          o.payment_status,
          c.name AS customer_name
       FROM orders o
       LEFT JOIN customers c ON c.id = o.customer_id
       WHERE o.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = rows[0];
    res.json({
      success: true,
      orderId: order.id,
      customerName: order.customer_name,
      totalAmount: order.total_amount,
      status: order.status,
      paymentStatus: order.payment_status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load order",
    });
  }
});

router.get("/", requireAdminSecret, async (_req, res) => {
  try {
    await ensureOrderColumns();
    const [rows] = await pool.query(
      `SELECT
          o.id,
          o.customer_id,
          o.total_amount,
          o.status,
          o.payment_status,
          o.channel,
          o.created_at,
          c.name AS customer_name,
          c.email AS customer_email,
          (
            SELECT p.payment_method
            FROM payments p
            WHERE p.order_id = o.id
            ORDER BY p.created_at DESC
            LIMIT 1
          ) AS payment_method
       FROM orders o
       LEFT JOIN customers c ON c.id = o.customer_id
       ORDER BY o.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load orders",
    });
  }
});

router.get("/:id", requireAdminSecret, async (req, res) => {
  try {
    await ensureOrderColumns();
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load order",
    });
  }
});

router.put("/:id/status", requireAdminSecret, async (req, res) => {
  const status = String(req.body?.status ?? "")
    .trim()
    .toLowerCase();

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  try {
    const [existing] = await pool.query("SELECT id FROM orders WHERE id = ?", [
      req.params.id,
    ]);

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      req.params.id,
    ]);

    const order = await getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update order status",
    });
  }
});

module.exports = router;
