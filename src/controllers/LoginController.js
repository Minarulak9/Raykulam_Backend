const User=require("../models/UserModel")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const env =require("dotenv")
env.config();
const jwtSecret=process.env.JWTSECRET;

const userLogin=async(req,res)=>{
try {
    const {email,password}=req.body;
    //User:->datbase,
    //user:->real actual user
    console.log(req.body);
    
    const user= await User.findOne({email}).select("+password");    
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User Not found!!Retry again"
        })
    }

    const matchPassword= await user.comparepassword(password);
    console.log(matchPassword);
    
    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:"Invalid Password"
        })
    }
    const accessToken= jwt.sign({id:user._id},jwtSecret,{expiresIn:"2d"}); 
    const refreshToken =jwt.sign({id:user._id},process.env.JWTSECRET_REFRESH,{expiresIn:"7d"})

    res.cookie("userAccess_Token",accessToken,{
        httpOnly:true,
         secure: true,
  sameSite: "none",
  domain: ".raykulam.com",
        maxAge:2*24*60*60*1000
    })

    res.cookie("userRefresh_Token",refreshToken,{
        httpOnly:true,
           secure: true,
  sameSite: "none",
  domain: ".raykulam.com",
        maxAge:7*24*60*60*1000
    })

    return res.status(201).json({
        success:true,
        message:"Login Successfull",
        role:"user",
        id:user._id,
        fullname:user.fullname,
        email:user.email
    })
} catch (error) {
    console.error("Failed to login",error);
    return res.status(500).json({
        success:false,
        message:"Internal server error",
        error
    })
    
}
}


const generateNewAccessToken=async(req,res)=>{
    const {userRefresh_Token}=req.cookies;
    if(!userRefresh_Token){
        return res.status(401).json({
            success:false,
            message:"UnAuthorize!! Login Again"
        })
    }
    try {
        const payload= await jwt.verify(userRefresh_Token,process.env.JWTSECRET_REFRESH);
        const newAccessToken= await jwt.sign ({id:payload.id},jwtSecret,{expiresIn:"2d"}); 
        res.cookie("userAccess_Token",newAccessToken,{
            httpOnly:true,
              secure: true,
  sameSite: "none",
  domain: ".raykulam.com",
            maxAge:2*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"New access token issued"
        });
    } catch (error) {
        console.error("Error to generateMessage",error);
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}

const userLogout=async(req,res)=>{

    try {
        res.clearCookie("userAccess_Token",{
            httpOnly:true,
          secure: true,
  sameSite: "none",
  domain: ".raykulam.com",
        })

        res.clearCookie("userRefresh_Token",{
            httpOnly:true,
             secure: true,
  sameSite: "none",
  domain: ".raykulam.com",
        })
        return res.status(200).json({
            success:true,
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log("Error to logOut user",error);
         res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}


const checkUserLogin=async(req,res)=>{
    const token = req.cookies.userAccess_Token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Login again",
            isLoggedin:false
        })
    }
    try {
        await jwt.verify(token,jwtSecret);
        return res.status(200).json({
            success:true,
            message:"isLoggedin",
            isLoggedin:true
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Login Again",
            isLoggedin:false
        })
    }
}
module.exports= {
    userLogin,
    userLogout,
    checkUserLogin,
    generateNewAccessToken
}