const express = require("express");
const pool = require("../config/db");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let tableReady = false;

async function ensureNewsletterTable() {
  if (tableReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  tableReady = true;
}

router.post("/", async (req, res) => {
  const email = String(req.body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!email || email.length > 255 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email.",
    });
  }

  try {
    await ensureNewsletterTable();
    await pool.query(
      "INSERT INTO newsletter_subscribers (email) VALUES (?)",
      [email]
    );

    return res.status(201).json({
      success: true,
      alreadySubscribed: false,
      message: "You are on the list. Welcome to SAAQ.",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: "You are already on the SAAQ list.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to join the list right now.",
    });
  }
});

module.exports = router;
