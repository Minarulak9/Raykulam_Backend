const express= require("express")
const app = express();
const router = express.Router();
const {Usercontrollers}= require("../../controllers")
const{authMiddleware}=require("../../middlewares")

router.get("/",authMiddleware.authenticator,Usercontrollers.UserFindOnedata);
router.get("/alluser",authMiddleware.authenticator,Usercontrollers.UserFindManydata);
router.post("/",Usercontrollers.UserCreateData);
router.put("/",authMiddleware.authenticator,Usercontrollers.UserUpdateData);
router.delete("/",authMiddleware.authenticator,Usercontrollers.UserDeleteData);


module.exports=router;