const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();

const generateAccessToken=(user)=>{
    return jwt.sign(
        {id:user._id,email:user.email},
        process.env.ACCESSTOKENSECRET,
        {expiresIn:process.env.ACCESSTOKENEXPIRES}
    )
}

const generateRefreshToken=(user)=>{
    return jwt.sign(
         {id:user._id,email:user.email},
         process.env.REFRESHTOKENSECRET,
        {expiresIn:process.env.REFRESHTOKENEXPIRES}
    )
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}