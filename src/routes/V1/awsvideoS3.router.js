const {awsS3VideoUploadController}=require("../../controllers")
const express= require("express")
const router=express.Router();

router.post("/video/create",awsS3VideoUploadController.createUpload);
router.post("/video/pre-signedpart",awsS3VideoUploadController.preSignedUrlPart);
router.post("/video/complete",awsS3VideoUploadController.completeUpload);
router.post("video/abort",awsS3VideoUploadController.abortUpload);
router.post("/video/list-parts",awsS3VideoUploadController.listUploadedParts);

module.exports=router;