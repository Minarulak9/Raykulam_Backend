const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Apirouter = require("./routes");
const connectDB = require("./utils/db");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://secure-admin.raykulam.com",
      "https://www.raykulam.com",
      "https://api.raykulam.com"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", Apirouter);

// ---------- START SERVER ----------
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT || 3300, () => {
    console.log(`Server running on port ${process.env.PORT || 3300}`);
  });
});
