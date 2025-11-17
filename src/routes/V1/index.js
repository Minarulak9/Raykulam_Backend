const express= require("express")
const app = express();
const router = express.Router();



const userRouter=require("./user.router")
const loginRouter=require("./Login.router")
const adminRouter=require("./adminrouter");
const uploadBannerToAwsS3=require("./uploadBannertoawsS3");
const bannerRouter=require("./bannerRouter");
const awsS3uploadvideoRouter=require("./awsvideoS3.router")


router.use("/createuser",userRouter);
router.use("/auth/finduser",userRouter);
// router.use("/findmanyuser",userRouter);
router.use("/auth/updateuser",userRouter);
router.use("/auth/deleteuser",userRouter);


//Login
router.use("/login",loginRouter)
router.use("/auth/user",loginRouter)
router.use("/auth/user",loginRouter)
router.use("/user",loginRouter)

//admin_Router
router.use("/auth/admin",adminRouter);
router.use("/auth/findadmin",adminRouter);
router.use("/auth",adminRouter);
router.use("/auth/updateadminPass",adminRouter);
router.use("/adminlogin",adminRouter);
router.use("/refresh-token",adminRouter);


//uploadBanner to aws s3
router.use("/uploadbanner",uploadBannerToAwsS3);



//banner(CRUD)
router.use("/banner",bannerRouter);


//upload video to s3
router.use("/upload",awsS3uploadvideoRouter)

module.exports=router;