const adminAuthRoutes = require("./routes/adminAuth.routes");
const adminProtectedRoutes = require("./routes/adminProtected.routes");
module.exports = (app) => {
  app.use("/api/v1/admin", adminAuthRoutes);
  app.use("/api/v1/admin", adminProtectedRoutes);
};
