const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.admin_access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Access token expired" });
  }
};
