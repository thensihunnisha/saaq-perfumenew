const { createHmac, timingSafeEqual } = require("crypto");

function digest(value) {
  return createHmac("sha256", "saaq-admin-write").update(String(value)).digest();
}

function requireAdminSecret(req, res, next) {
  const expected = process.env.ADMIN_API_SECRET;
  const provided = req.get("x-admin-secret") || "";

  if (!expected) {
    return res.status(500).json({
      success: false,
      message: "Admin write access is not configured",
    });
  }

  if (!timingSafeEqual(digest(provided), digest(expected))) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return next();
}

module.exports = requireAdminSecret;
