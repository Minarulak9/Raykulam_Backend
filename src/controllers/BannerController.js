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
// const UpdateBanner=async(req,res)=>{
//     try {
//         const data= await req.body;
//     } catch (error) {
        
//     }
// }
const getBanner=async(req,res)=>{
    try {
        console.log("banner id ",req.params);
        const {id}= req.params;
        const responce =await bannerService.findOneBanner(id);
        return res.status(200).json({
            success:true,
            message:"successfully get banner data",
            responce
        })
    } catch (error) {
        console.log("error to get banner data");
        return res.status(404).json({
            success:false,
            message:"error to get banner data",
            error
        })
    }
}
module.exports={
    createBanner,
    getAllBanner,
    getBanner
}