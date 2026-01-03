const mysqlPool = require("../db/mysql");

module.exports = async ({ adminId = null, action, req }) => {
  try {
    await mysqlPool.query(
      `INSERT INTO admin_audit_logs (admin_id, action, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [
        adminId,
        action,
        req.ip,
        req.headers["user-agent"] || null
      ]
    );
  } catch (err) {
    // Never block auth on audit failure
    console.error("Audit log failed:", err.message);
  }
};
