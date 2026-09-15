const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const pool = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "SAAQ API is running",
  });
});

app.get("/api/test-db", async (_req, res) => {
  try {
    await pool.query("SELECT 1 AS test");
    res.json({
      success: true,
      message: "MySQL connected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "MySQL connection failed",
    });
  }
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

app.listen(port, () => {
  console.log(`SAAQ API running on http://localhost:${port}`);
});
