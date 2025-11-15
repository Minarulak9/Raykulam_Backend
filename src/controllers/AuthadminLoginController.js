const jwt = require("jsonwebtoken");
const admin=require("../models/adminModel")
const dotenv=require("dotenv")
dotenv.config();
const{generateAccessToken,generateRefreshToken}=require("../utils/jwt")

const adminLogin=async(req,res)=>{
try {
    const {email,password}=req.body;
    console.log(req.body);
    
    const adminexist =await admin.findOne({email}).select("+password");
       if(!adminexist){
        return res.status(400).json({
            success:false,
            message:"admin Not found!!Retry again"
        })
    }
    const matchPassword= await adminexist.comparepassword(password);
    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:"incorrect-password"
        })
    }


    const accessToken=generateAccessToken(adminexist);
    const refreshToken=generateRefreshToken(adminexist);

// ⚠⚠⚠⚠ make samesite ="strict"  && secure = true when it goes in production
    res.cookie("access_token",accessToken,{
        httpOnly:true,
          secure: true,
         sameSite: "none",
        domain: "shaligramhealing.space",
        maxAge: 15 * 60 * 1000,
    })

    res.cookie("refresh_token",refreshToken,{
        httpOnly:true,
         secure: true,
  sameSite: "none",
  domain: "shaligramhealing.space",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

      return res.status(200).json({ 
        success: true,
         message: "Logged in successfully" ,
         id:adminexist._id,
         fullname:adminexist.fullname,
         email:adminexist.email
        })

} catch (error) {
    console.log("Error to  admin Login!! Try again  ",error)
    res.status(500).json({ message: "Server error" });
}
}


const generateNewAccessToken=async(req,res)=>{

    const {refresh_token}=req.cookies;
    console.log(refresh_token);
    if(!refresh_token){
       return  res.status(401).json({
            success:false,
            message:"unAuthorized!! Login Again"
        })
    }
    try {
        const payload=await jwt.verify(refresh_token,process.env.REFRESHTOKENSECRET);
        const newaccessToken= generateAccessToken(payload);

      res.cookie("access_token", newaccessToken, {
      httpOnly: true,
      secure: true,
  sameSite: "none",
  domain: "shaligramhealing.space",
      maxAge: 15 * 60 * 1000,
    });

    console.log(newaccessToken);
    
    return res.status(200).json({  
         success: true,
         message: "New access token issued",
        });

    } catch (error) {
        
        console.log("Error to  generate refresh token   ",error)
    res.status(500).json({ message: "Server error" });
    }

}


const adminLogout=async(req,res)=>{
    try {
        res.clearCookie("access_token",{
            httpOnly:true,
              secure: true,
  sameSite: "none",
  domain: "shaligramhealing.space",
        })

        res.clearCookie("refresh_token",{
            httpOnly:true,
            secure: true,
  sameSite: "none",
  domain: "shaligramhealing.space",
        })

        return res.status(200).json({
            success:true,
            message:"Logout Sucessfully"
        })
    } catch (error) {
           console.log("Error to  logOut admin  ",error)
    res.status(500).json({ message: "Server error" });
    }
}


const checkLogin=(req,res)=>{
    const token= req.cookies.access_token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Login again",
            isLoggedin:false
        })
    }

    try {
        jwt.verify(token,process.env.ACCESSTOKENSECRET);
        return res.status(200).json({
            success:true,
            message:"loggedin",
            isLoggedin:true
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Login again",
            isLoggedin:false
        })
    }
}
module.exports={
adminLogin,
checkLogin,
adminLogout,
generateNewAccessToken
}