const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlPool = require("../db/mysql");
const cookieOptions = require("../utils/cookieOptions");
const hashToken = require("../utils/hashToken");
const auditLog = require("../utils/auditLog");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const [rows] = await mysqlPool.query(
      "SELECT id, email, password_hash FROM admins WHERE email = ? AND is_active = true",
      [email]
    );

    if (!rows.length) {
      await auditLog({ action: "LOGIN_FAILED", req });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      await auditLog({
        adminId: admin.id,
        action: "LOGIN_FAILED",
        req
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Optional: single-session policy
    await mysqlPool.query(
      "DELETE FROM admin_refresh_tokens WHERE admin_id = ?",
      [admin.id]
    );

    await auditLog({
      adminId: admin.id,
      action: "LOGIN_SUCCESS",
      req
    });

    const accessToken = jwt.sign(
      { adminId: admin.id, role: "admin" },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXP }
    );

    const refreshToken = jwt.sign(
      { adminId: admin.id },
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXP }
    );

    const refreshExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await mysqlPool.query(
      `INSERT INTO admin_refresh_tokens (admin_id, token_hash, expires_at)
       VALUES (?, ?, ?)`,
      [admin.id, hashToken(refreshToken), refreshExpiresAt]
    );

    res.cookie("admin_access_token", accessToken, cookieOptions);
    res.cookie("admin_refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

