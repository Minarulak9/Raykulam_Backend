const JWT= require("jsonwebtoken")
const env=require("dotenv")
env.config();

const JWTSecret=process.env.JWTSECRET;
const authenticator=async(req,res,next)=>{
     const authheader= req.headers.authorization;
     console.log(authheader);
        if(!authheader||!authheader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Access Denied! Please Log in"
            })
        }
     const token= authheader.split(" ")[1];

    try {
       const decodedToken= JWT.verify(token,JWTSecret);
       req.user=decodedToken;
       next();

    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"Inavlid or expire token"
        })
    }
}

module.exports={
    authenticator
}