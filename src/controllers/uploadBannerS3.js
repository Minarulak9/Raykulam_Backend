const generatePresignedUrl = require("../utils/generateS3url");

const uploadBanner=async(req,res)=>{
    try {
        const {folder,filename,filetype}=req.body;
        console.log(req.body);

           if (!folder || !filename || !filetype) {
      return res.status(400).json({ error: "folder,filename,filetype  required" });
           }

     const {key,uploadURl}=await generatePresignedUrl(folder,filename,filetype);

      return res.json({
        success:true,
        key,
        uploadURl
      })
    
    } catch (error) {
        console.log("error to generate urls",error);
        res.status(500).json({ error: "Failed to generate URLs" });
    }
}
module.exports={
  uploadBanner
};

