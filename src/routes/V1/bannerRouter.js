const express= require("express")
const router= express.Router();
const {bannerController}=require("../../controllers")
const {verifyToken}=require("../../middlewares/authverifyadminCookies")


router.get("/",bannerController.getAllBanner);
router.post("/createbanner",bannerController.createBanner);
router.put("/updatebanner/:id",bannerController.updateBanner);
router.delete("/deletebanner/:id",bannerController.deleteBanner);

module.exports=router;