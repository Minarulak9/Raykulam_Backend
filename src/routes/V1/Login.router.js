const express= require("express")
const app= express();
const router= express.Router();

const {LoginController}=require("../../controllers")
const {authMiddleware}=require("../../middlewares");
const { userauthverifyToken } = require("../../middlewares");


router.post("/",LoginController.userLogin);
router.post("/logout",userauthverifyToken.userverifyToken,LoginController.userLogout);
router.get("/verify",userauthverifyToken.userverifyToken,LoginController.checkUserLogin);
router.get("/refresh-token",LoginController.generateNewAccessToken);

module.exports=router;