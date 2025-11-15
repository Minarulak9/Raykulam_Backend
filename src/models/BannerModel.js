const mongoose = require("mongoose")

const BannerSchema= new mongoose.Schema({
   
    deskTop_bannerurl:{
        type:String
    },
    mobile_bannerurl:{
        type:String
    },
    tablet_bannerurl:{
        type:String
    },
    bannerType:{
        type:String,
        
    },
    bannerCategory:{
        type:String,
        required:true
    },
    bannerHeading:{
        type:String
    },
    bannerDescription:{
        type:String
    },
    previewVideo:{
        type:String
    },
    isActive:{
        type:String,
        enum:["published","unlist"],
        default:"unlist"
    }
},
{
    timestamps:true 
})

module.exports= mongoose.model("banner",BannerSchema);