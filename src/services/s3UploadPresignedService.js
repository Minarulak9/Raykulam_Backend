

const {
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    AbortMultipartUploadCommand,
    ListPartsCommand
}=require("@aws-sdk/client-s3")

const {getSignedUrl}=require("@aws-sdk/s3-request-presigner");
const  {s3Client} =require("../utils/s3client");

const BUCKET=process.env.BUCKET;
 
async function createmultipart({Key,ContentType}) {
    const cmd=new CreateMultipartUploadCommand({
        Bucket:BUCKET,
        Key,
        ContentType,
        ACL:"private"
    })
    const responce = await s3Client.send(cmd);
    return responce;
}

async function generatePreSignedPartUrl({Key,UploadId,PartNumber,expiresIn=3600}) {

    const cmd = new UploadPartCommand({
        Bucket:BUCKET,
        Key,
        UploadId,
        PartNumber
    })
    const url = await getSignedUrl(s3Client,cmd,{expiresIn});
    return url;
}

async function completeMultipartUpload({Key,UploadId,parts}) {
    
    const cmd = new CompleteMultipartUploadCommand({
        Bucket:BUCKET,
        Key,
        UploadId,
        MultipartUpload:{Parts:parts}
    });
    const responce = await s3Client.send(cmd);
    return responce;
}

async function abortMultipartUpload({ Key, UploadId }) {
  const cmd = new AbortMultipartUploadCommand({
    Bucket: BUCKET,
    Key,
    UploadId,
  });
  const resp = await s3Client.send(cmd);
  return resp;
}

async function listParts({ Key, UploadId }) {
  const cmd = new ListPartsCommand({
    Bucket: BUCKET,
    Key,
    UploadId,
  });
  const resp = await s3Client.send(cmd);
  return resp; // contains Parts array
}

module.exports= { 
    createmultipart,
    generatePreSignedPartUrl,
    completeMultipartUpload,
    abortMultipartUpload,
    listParts
}