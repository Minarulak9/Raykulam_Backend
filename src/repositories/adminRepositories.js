const curdrepositories =require("./CURDrepo");
const adminModel=require("../models/adminModel");


// ❌❌❌❌❌❌do not un-comment this code
// const newAdmin=async() => await adminModel.create({
//   fullname: "TestAdmin",
//   email: "Test@admin.com",
//   password: "TestAdmin123", // plain text input
// });
// newAdmin();
class AdminRepositories extends curdrepositories{
    constructor(){
        super(adminModel);
    }
}
module.exports=AdminRepositories;