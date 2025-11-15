const {bannerService}= require("../services")

const createBanner=async(req,res)=>{
try {
    console.log(req.body);
    
    const responce= await bannerService.createBannerService(req.body);
    return res.status(200).json({
        success:true,
        message:"successfully created banner"
    })
} catch (error) {
    console.log("error to create banner",error);
   return res.status(500).json({
    success:false,
    message:"error to create banner"
   })
}
}

module.exports={
    createBanner
}