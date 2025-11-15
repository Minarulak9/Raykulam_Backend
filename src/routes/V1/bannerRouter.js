const express= require("express")
const router= express.Router();
const {bannerController}=require("../../controllers")
const {verifyToken}=require("../../middlewares/authverifyadminCookies")


router.post("/createbanner",verifyToken,bannerController.createBanner);

module.exports=router;