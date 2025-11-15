// const {s3Service}=require("../services")

// const uploadVideoS3Controller=async (req,res)=>{
//     try {
//         const {fileName,contentType}=req.body;
//         console.log(fileName,contentType);
        
//         if(!fileName||!contentType){
//             return res.status(401).json({
//                 success:false,
//                 message:"fileName & contentType required"
//             });
//         }
//         const {uploadURl,Key}= await s3Service.generateUploadURL(fileName,contentType);
//         return res.status(200).json({
//             success:true,
//             message:"successfully created PreSignedURL,Key",
//             uploadURl,
//             Key
//         })
//     } catch (error) {
//         console.log("error to create preSignedUrl",error)
//         throw error
//     }
// }
// module.exports={
//     uploadVideoS3Controller
// }

const {s3videoUpload}= require("../services")
const {v4}=require("uuid");
const { s3Client } = require("../utils/s3client");

async function createUpload(req,res) {
    try {
        const {filename,fileType,userId}=req.body;
        console.log(req.body);
        
        if(!filename || !fileType || !userId){
            return res.status(400).json({
                success:false,
                message:"filename,fileType,userid required"
            })}

            const Keyfile=`uploads/videos/${userId}/${v4()}-${filename}`;
            const responce = await s3videoUpload.createmultipart({Key:Keyfile,ContentType:fileType})
            return res.status(200).json({
              UploadId:responce.UploadId,
              Key:Keyfile  
            }) 

    } catch (error) {
        console.error("createUpload contoller error",error);
        return res.status(500).json({
            error:String(error)
        })
    }
}

async function preSignedUrlPart(req,res) {
    try {
      console.log("presigned req",req.body);
      
        const {Key,UploadId,partNumber,expiresIn}=req.body;
        if(!Key||!UploadId||!partNumber){
            return res.status(400).json({
                success:false,
                message:"missing Key, UploadId,partNumber"
            })}
        const url = await s3videoUpload.generatePreSignedPartUrl({Key:Key,UploadId:UploadId,PartNumber:Number(partNumber),expiresIn})
        console.log("presigned url",url);
        return res.status(200).json({
            partNumber,
            url
        })

    } catch (error) {
        console.error("PreSignedPart controller  Error",error);
        return res.status(500).json({
            error:String(error)
        })
    } 
}

async function completeUpload(req, res) {
  try {
    const { Key, UploadId, parts } = req.body;
    if (!Key || !UploadId || !parts?.length) return res.status(400).json({ error: "missing params" });

      const formattedParts = parts.map(p => ({
    ETag: p.ETag.startsWith('"') ? p.ETag : `"${p.ETag}"`, // ensure quotes
    PartNumber: Number(p.PartNumber),
  })).sort((a, b) => a.PartNumber - b.PartNumber);

    const resp = await s3videoUpload.completeMultipartUpload({ Key: Key, UploadId: UploadId, parts: formattedParts});
    return res.json({ result: resp });
  } catch (err) {
    console.error("completeUpload error:", err);
    return res.status(500).json({ error: String(err) });
  }
}



/**
 * Abort multipart upload
 * Request body: { Key, uploadId }
 */
async function abortUpload(req, res) {
  try {
    const { Key, UploadId } = req.body;
    if (!Key || !UploadId) return res.status(400).json({ error: "need Key and uploadid for abortUpload" });
    await s3videoUpload.abortMultipartUpload({ Key: Key, UploadId: UploadId });
    return res.json({ aborted: true });
  } catch (err) {
    console.error("abortUpload error:", err);
    return res.status(500).json({ error: String(err) });
  }
}

/**
 * List uploaded parts for resume
 * Request body: { Key, uploadId }
 * Response: { parts: [...] }
 */
async function listUploadedParts(req, res) {
  try {
    const { Key, UploadId } = req.body;
    if (!Key || !UploadId) return res.status(400).json({ error: "missing params" });

    const resp = await s3videoUpload.listParts({ Key: Key, UploadId: UploadId });
    return res.json({ parts: resp.Parts || [] });
  } catch (err) {
    console.error("listParts error:", err);
    return res.status(500).json({ error: String(err) });
  }
}

module.exports={
    createUpload,
    preSignedUrlPart,
    completeUpload,
    abortUpload,
    listUploadedParts
}