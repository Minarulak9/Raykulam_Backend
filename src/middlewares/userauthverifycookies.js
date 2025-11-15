const jwt = require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config();

const userverifyToken = (req, res, next) => {
  const token = req.cookies.userAccess_Token;
  console.log(token);
  
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};

module.exports={
    userverifyToken
}