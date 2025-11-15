const {AdminRepo}=require("../repositories")
const AdminService= new AdminRepo();


async function FindAdminService(data) {
    try {
        const responce= await AdminService.FindDataOne(data);
        return responce;
    } catch (error) {
        console.log("Error to  find admin data",error);
        throw error;
    }
}
 
async function updatePassword(data) {
    try {
        const responce= await AdminService.updateData(data);
        return responce;
    } catch (error) {
        console.error("Error to update data");
        throw error;
    }
}
module.exports={
    FindAdminService,
    updatePassword
}