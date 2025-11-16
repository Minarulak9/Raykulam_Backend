const {PutObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
const{ s3Client}=require("./s3client")

async function generatePresignedUrl(folder,fileName,fileType) {
   
        const timestamp=Date.now();
        const key=`${folder}/${timestamp}-${fileName}`;
        const command= new PutObjectCommand({
            Bucket:process.env.BUCKETNAME,
            Key:key,
            ContentType:fileType
        })

        const uploadURl= await getSignedUrl(s3Client,command,{expiresIn:300});
        return {key,uploadURl};
    } 

module.exports=generatePresignedUrl;