const {bannerepo}=require("../repositories")

const bannerService=new bannerepo();

async function createBannerService(data) {
    try {
        const responce= await bannerService.createData(data);
        return responce;
    } catch (error) {
        console.error("Error to create Banner ",error);
        throw error;
    }
}

async function findAllBannerdata() {
    try {
        const responce= await bannerService.findBannerAllData();
        return responce;
    } catch (error) {
        console.error("Error to find all banner data",error);
        throw error;
    }
}

async function findOneBanner(filter) {
    try {
        const responce =await bannerService.FindDataOne(filter);
        return responce;
    } catch (error) {
        console.error("Error to find banner data");
        throw error;
    }
    
}
async function updateBannerdata(data) {
    try {
        const responce= await bannerService.updateData(data);
        return responce;
    } catch (error) {
        console.error("Error to update banner",error);
        throw error;
    }
}

async function deleteBannerdata(data) {
    try {
        const responce= await bannerService.deleteData(data);
        return responce;
    } catch (error) {
        console.error("Error to delete data",error);
        throw error;
    }
}

module.exports={
    createBannerService,
    updateBannerdata,
    findAllBannerdata,
    findOneBanner,
    deleteBannerdata
}