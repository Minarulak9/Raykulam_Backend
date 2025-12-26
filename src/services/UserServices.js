const {UserRepositories}=require("../repositories")

const userService= new UserRepositories();

async function createUserService(data) {
    try {
        const responce = await userService.createData(data);
        return responce;
    } catch (error) {
        console.error("Error to create data",error)
        return  error;
    }  
}
async function FindOneUserService(filter) {
    try {
        const responce= await userService.FindDataOne(filter);
        return responce;
    } catch (error) {
        console.log("Error to get data",error);
        throw error;
    }
}
async function FindManyUserService() {
    try {
        const responce= await userService.FindAllData();
        return responce;
    } catch (error) {
        console.log("Error to get data",error);
        throw error;
    }
}
async function updateUserService(id,data) {
    try {
        const responce= await userService.updateData(id,data);
        return responce;
    } catch (error) {
        console.error("Error to update  data",error)
        return error;
    }
}

async function deleteUserService(filter) {
    try {
        const responce = await userService.deleteData(filter);
        return responce;
    } catch (error) {
        console.error("Error to delete data",error)
        throw error;
    }
}
async function preExistingUser(field,data) {
    try {
        const responce = await userService.findpreExistingUserForValidation({[field]:data});
        return responce;
    } catch (error) {
        console.error("Error something in preexisting user record data",error)
        throw error;
    }
}
module.exports={
    createUserService,
    FindOneUserService,
    FindManyUserService,
    preExistingUser,
    updateUserService,
    deleteUserService
}