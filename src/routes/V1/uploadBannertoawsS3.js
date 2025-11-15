const express= require("express")
const router= express.Router();

const {uploadBannerToS3}=require("../../controllers")

router.post("/pre-signedUrl",uploadBannerToS3.uploadBanner);

module.exports=router;