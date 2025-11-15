const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Apirouter = require("./routes");
const connectDB = require("./utils/db");
const dotenv = require("dotenv");
dotenv.config();

// ---------- FIX FOR VERCEL PRE-FLIGHT (IMPORTANT) ----------
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://secure-admin.raykulam.com",
    "https://www.raykulam.com"
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ---------- ADDITIONAL CORS MIDDLEWARE ----------
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
