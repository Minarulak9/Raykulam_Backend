const express = require("express");
const router = express.Router();
const requireAdmin = require("../middlewares/requireAdmin");

router.get("/me", requireAdmin, (req, res) => {
  res.json({
    message: "Admin authenticated",
    admin: req.admin,
  });
});

module.exports = router;
