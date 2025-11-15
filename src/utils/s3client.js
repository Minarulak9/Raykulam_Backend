const {S3Client}=require("@aws-sdk/client-s3")

require("dotenv").config();

const s3Client= new S3Client({
    region:process.env.REGION,
    credentials:{
       accessKeyId:process.env.ACCESSKEYID,
        secretAccessKey:process.env.SECRETKEYID
    }
})


module.exports={s3Client}