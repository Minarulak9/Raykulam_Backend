const express= require("express")
const router= express.Router();
const {bannerController}=require("../../controllers")
const {verifyToken}=require("../../middlewares/authverifyadminCookies")


router.get("/",bannerController.getAllBanner);
router.get("/getbanner/:id",bannerController.getBanner);
router.post("/createbanner",bannerController.createBanner);

module.exports=router;