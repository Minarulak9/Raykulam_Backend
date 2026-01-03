const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/adminAuth.controller");
const { refreshAdminToken } = require("../controllers/adminRefresh.controller");
const { adminLogout } = require("../controllers/adminLogout.controller");
const adminLoginLimiter = require("../middlewares/adminLoginLimiter");

router.post("/login", adminLoginLimiter, adminLogin);
router.post("/refresh", refreshAdminToken);
router.post("/logout", adminLogout);

module.exports = router;
