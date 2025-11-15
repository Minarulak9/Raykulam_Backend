const mongoose= require("mongoose")

const connectDB=async(dburl)=>{
    try { 
        const connection= await mongoose.connect(dburl)
        console.log("✔ DB connected");
    } catch (error) {
        console.error("❌ Error to Connect DB :",error);
        process.exit(1);
    }
}
module.exports= connectDB;