const { bannerepo } = require("../repositories")

const bannerService = new bannerepo();

async function createBannerService(data) {
    try {
        const responce = await bannerService.createData(data);
        return responce;
    } catch (error) {
        console.error("Error to create Banner ", error);
        throw error;
    }
}

async function findAllBannerdata() {
    try {
        const responce = await bannerService.findBannerAllData();
        return responce;
    } catch (error) {
        console.error("Error to find all banner data", error);
        throw error;
    }
}

async function updateBannerService(id, updateData) {
    try {
        const response = await bannerService.updateData(id, updateData);
        console.log("Updated Banner:", response);
        return response;
    } catch (error) {
        console.error("Error to update banner", error);
        throw error;
    }
}

async function deleteBannerService(data) {
    try {
        const responce = await bannerService.deleteData(data);
        return responce;
    } catch (error) {
        console.error("Error to delete data", error);
        throw error;
    }
}

module.exports = {
    createBannerService,
    updateBannerService,
    findAllBannerdata,
    deleteBannerService
}