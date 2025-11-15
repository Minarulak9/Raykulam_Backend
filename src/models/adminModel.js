const mongoose= require("mongoose")
const bcrypt= require("bcrypt")
const {AllpermissionList}=require("../constants")

const adminschema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:["owner"],
        default:"owner"
    },
    Permissions:{
        type:[String],
        default:Object.values(AllpermissionList.AdminpermissionList)
    },
    isActive:{
        type:Boolean,
        default:true
    },
    lastLogin:Date,

},{ timestamps:true});
//hashed password
adminschema.pre("save",async function(next) {
    if(!this.isModified("password")){ 
    return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
//compare password
adminschema.methods.comparepassword=async function(password) {
    return await bcrypt.compare(password,this.password);
};
//check it has permission or not
adminschema.methods.hasPermissions=function (Permission){
    return this.Permissions.includes(AllpermissionList.AdminpermissionList.full_access)||this.Permissions.includes(Permission);
}

module.exports=mongoose.model("admin",adminschema);