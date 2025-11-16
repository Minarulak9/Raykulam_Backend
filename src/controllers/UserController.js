const {UserServices}=require("../services")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();

const UserCreateData=async(req,res)=>{
    try {
        // console.log(req.body);
        const existingemail = await UserServices.preExistingUser("email",req.body.email);
        const existingphone= await UserServices.preExistingUser("phone",req.body.phone);
       
        
        if(existingemail){
           return res.status(400).json({
            success:false,
            message:"Email should be unique"
            })
        }

         if(existingphone){
           return res.status(400).json({
            success:false,
            message:"phone Number should be unique "
            })
        }

        const responce= await UserServices.createUserService({
            fullname:req.body.fullname,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
        })
        const accessToken= jwt.sign({id:responce._id},process.env.JWTSECRET,{expiresIn:"2d"});
        const refreshToken= jwt.sign({id:responce._id},process.env.JWTSECRET_REFRESH,{expiresIn:"7d"});
        res.cookie("userAccess_Token",accessToken,{
            httpOnly:true,
             secure: process.env.NODE_ENV === "production",
  sameSite: "none",
    domain: process.env.NODE_ENV === "production" ? "shaligramhealing.space" : undefined,
            maxAge:2*24*60*60*1000
        })
        res.cookie("userRefresh_Token",refreshToken,{
            httpOnly:true,
             secure: process.env.NODE_ENV === "production",
  sameSite: "none",
    domain: process.env.NODE_ENV === "production" ? "shaligramhealing.space" : undefined,
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({
            success:true,
            message:"Successfully Created Profile",
            responce:responce
        }) 

    } catch (error) {
         console.error("unable to create profile",error)
        return res.status(400).json({
            success:false,
            message:"unable to create profile",
            error:error
        })
    
    }
}

//api like :http://localhost:3000/api/v1/finduser?id=68f0d50e3131f33f616a6b01
const UserFindOnedata=async(req,res)=>{
    try {
        const query= req.query.id;
        const  responce= await UserServices.FindOneUserService(query);
        // console.log(query);
        
        return res.status(201).json({
            success:true,
            message:"Successfully find Data",
            responce:responce
        })
    } catch (error) {
             console.error("unable to find data",error)
        return res.status(400).json({
            success:false,
            message:"No data found",
            error:error
        })
    }
}


// const UserFindManydata=async(req,res)=>{
//     try {
//         const query= req.params.lastname;
//         const  responce= await UserServices.FindManyUserService({lastname:query});
//         console.log(query);
        
//         return res.status(201).json({
//             success:true,
//             message:"Successfully find Data",
//             responce:responce
//         })
//     } catch (error) {
//              console.error("unable to find data",error)
//         return res.status(400).json({
//             success:false,
//             message:"No data found",
//             error:error
//         })
//     }
// }

const UserUpdateData=async(req,res)=>{
    try {
        const id= req.query.id;
        const Updatefields= req.body;
        // console.log("id ",id,req.body)
        const responce=await UserServices.updateUserService(id,Updatefields);
        return res.status(200).json({
             success:true,
            message:"Successfully Updated Profile",
            responce:responce
        })
    } catch (error) {
         console.error("unable to update profile",error)
        return res.status(400).json({
            success:false,
            message:"unable to update profile",
            error:error
        })
    }
}

const UserDeleteData=async(req,res)=>{
    try {
        const responce= await UserServices.deleteUserService({
            id:req.query.id
        })
        return res.status(201).json({
            success:true,
            message:"you account will delete parmanently",
            responce:responce
        })
    } catch (error) {
        console.error("unable to delete  profile",error)
        return res.status(400).json({
            success:false,
            message:"unable to delete profile",
            error:error
        })
    }
}



module.exports={
    UserCreateData,
    UserFindOnedata,
    // UserFindManydata,
    UserUpdateData,
    UserDeleteData
}