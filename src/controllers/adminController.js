const {adminService}=require("../services")

const adminFindData=async(req,res)=>{

    try {
        const responce= await adminService.FindAdminService(req.params.id);
        return res.status(200).json({
            success:true,
            message:"successfully get data",
            id:responce._id,
            fullname:responce.fullname,
            email:responce.email,
            role:responce.role,
            isActive:responce.isActive 
        })
    } catch (error) {
        console.error("Error to find admin data",error);
        return res.status(500).json({
            success:false,
            message:"Error to find data",
            error
        })
    }
}

const updatePasswordData=async(req,res)=>{
    try {
        const id= req.params.id;
        const updatedpassword=req.body.password;
        const responce= await adminService.updatePassword(id,updatedpassword);
         console.log(responce);
        return res.status(200).json({
            success:true,
            message: "successfully updated password"
        });
      
        
    } catch (error) {
        console.error("Error to update password");
   return res.status(500).json({
            success:false,
            message:"Error to update password",
            error
        })
    }
}

module.exports={
    adminFindData,
    updatePasswordData
}