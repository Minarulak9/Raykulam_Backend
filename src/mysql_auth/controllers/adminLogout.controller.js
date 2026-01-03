const mysqlPool = require("../db/mysql");
const hashToken = require("../utils/hashToken");

exports.adminLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.admin_refresh_token;

    if (refreshToken) {
      const hashed = hashToken(refreshToken);

      // 🔥 Revoke refresh token from DB
      await mysqlPool.query(
        "DELETE FROM admin_refresh_tokens WHERE token_hash = ?",
        [hashed]
      );
    }

    // 🧹 Clear cookies
    res.clearCookie("admin_access_token");
    res.clearCookie("admin_refresh_token");

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
