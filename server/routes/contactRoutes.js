const express = require("express");
const pool = require("../config/db");
const requireAdminSecret = require("../middleware/adminSecret");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECTS = new Set([
  "Fragrance enquiry",
  "Order enquiry",
  "Delivery",
  "Returns & exchange",
  "Other",
]);

let tableReady = false;

async function ensureContactTable() {
  if (tableReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  tableReady = true;
}

function readContact(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const phone = String(body?.phone ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || name.length > 255) {
    return { error: "Enter your name." };
  }

  if (!email || email.length > 255 || !EMAIL_PATTERN.test(email)) {
    return { error: "Enter a valid email." };
  }

  if (phone.length > 50) {
    return { error: "Enter a valid phone number." };
  }

  if (!subject || !SUBJECTS.has(subject)) {
    return { error: "Select a subject." };
  }

  if (!message || message.length > 5000) {
    return { error: "Enter a message." };
  }

  return {
    contact: {
      name,
      email,
      phone: phone || null,
      subject,
      message,
    },
  };
}

router.post("/", async (req, res) => {
  const parsed = readContact(req.body);

  if (parsed.error) {
    return res.status(400).json({
      success: false,
      message: parsed.error,
    });
  }

  try {
    await ensureContactTable();
    const [result] = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [
        parsed.contact.name,
        parsed.contact.email,
        parsed.contact.phone,
        parsed.contact.subject,
        parsed.contact.message,
      ]
    );

    return res.status(201).json({
      success: true,
      id: result.insertId,
      message: "SAAQ has received your message.",
    });
  } catch (error) {
    console.error("Unable to save contact message", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now.",
    });
  }
});

router.get("/", requireAdminSecret, async (_req, res) => {
  try {
    await ensureContactTable();
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, subject, message, created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Unable to load contact messages", error);
    res.status(500).json({
      success: false,
      message: "Unable to load messages",
    });
  }
});

router.get("/:id", requireAdminSecret, async (req, res) => {
  try {
    await ensureContactTable();
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, subject, message, created_at
       FROM contact_messages
       WHERE id = ?
       LIMIT 1`,
      [req.params.id]
    );
    const message = rows[0];

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json(message);
  } catch (error) {
    console.error("Unable to load contact message", error);
    res.status(500).json({
      success: false,
      message: "Unable to load message",
    });
  }
});

module.exports = router;
