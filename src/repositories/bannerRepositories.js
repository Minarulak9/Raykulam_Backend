const curdrepositories =require("./CURDrepo")
const banner=require("../models/BannerModel")

class  bannerRepositories extends curdrepositories{
    constructor(){
        super(banner);
    }
    async findBannerAllData(){
        try {
            const responce= await banner.find({});
            return responce;
        } catch (error) {
            console.error("error in banner repo",error);
            return error;
        }
    }
} 
module.exports=bannerRepositories;