const express= require("express")
const router= express.Router();
const {adminController,authadmincontroller}=require("../../controllers")
const {verifyToken}=require("../../middlewares/authverifyadminCookies")



router.post("/",authadmincontroller.adminLogin);
router.get("/",authadmincontroller.generateNewAccessToken);
router.get("/verify",authadmincontroller.checkLogin);
router.post("/logout",verifyToken,authadmincontroller.adminLogout);

router.get("/:id",verifyToken,adminController.adminFindData);
router.post("/:id",verifyToken,adminController.updatePasswordData);
module.exports=router;
