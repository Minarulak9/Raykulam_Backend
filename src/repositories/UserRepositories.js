const curdrepositories= require("./CURDrepo")
const usermodel= require("../models/UserModel")

class UserRepositories extends curdrepositories  {
    constructor(){
        super(usermodel);
    }
    async findpreExistingUserForValidation(data){
        try {
            const responce = await usermodel.findOne(data);
            return responce; 
        } catch (error) {
            console.error("Error to find preExisting or not",error);
            throw error;
        }
    }
}
module.exports=UserRepositories;