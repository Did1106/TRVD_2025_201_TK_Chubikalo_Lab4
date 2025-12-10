const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "lab4_secret_key";

function apiAuth(req, res, next) {
  const header = req.headers["authorize"] || req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Authorization token required" });

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { apiAuth, JWT_SECRET };
