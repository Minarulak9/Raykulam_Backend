const curdrepositories =require("./CURDrepo")
const banner=require("../models/BannerModel")

class  bannerRepositories extends curdrepositories{
    constructor(){
        super(banner);
    }
} 
module.exports=bannerRepositories;