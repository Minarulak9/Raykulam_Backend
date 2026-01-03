const jwt = require("jsonwebtoken");
const mysqlPool = require("../db/mysql");
const cookieOptions = require("../utils/cookieOptions");
const hashToken = require("../utils/hashToken");

exports.refreshAdminToken = async (req, res) => {
  const refreshToken = req.cookies.admin_refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.ADMIN_REFRESH_TOKEN_SECRET
    );

    const hashed = hashToken(refreshToken);

    const [rows] = await mysqlPool.query(
      "SELECT id FROM admin_refresh_tokens WHERE admin_id = ? AND token_hash = ?",
      [decoded.adminId, hashed]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 🔁 ROTATE TOKEN
    await mysqlPool.query(
      "DELETE FROM admin_refresh_tokens WHERE token_hash = ?",
      [hashed]
    );

    const newAccessToken = jwt.sign(
      { adminId: decoded.adminId, role: "admin" },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXP }
    );

    const newRefreshToken = jwt.sign(
      { adminId: decoded.adminId },
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXP }
    );

    await mysqlPool.query(
      `INSERT INTO admin_refresh_tokens (admin_id, token_hash, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [decoded.adminId, hashToken(newRefreshToken)]
    );

    res.cookie("admin_access_token", newAccessToken, cookieOptions);
    res.cookie("admin_refresh_token", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Token refreshed" });
  } catch {
    res.status(401).json({ message: "Refresh token expired" });
  }
};
