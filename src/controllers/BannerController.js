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

const getAllBanner=async(req,res)=>{
    try {
        const responce = await bannerService.findAllBannerdata();
        return res.status(200).json({
            success:true,
            message:"successfully get data",
            responce
        })
    } catch (error) {
        console.error("error to get banner data in controller")
        return res.status(500).json({
            success:false,
            message:"Error to get banner data",
            error
        })
    }
}
module.exports={
    createBanner,
    getAllBanner
}