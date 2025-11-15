const bcrypt= require("bcrypt")
const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim:true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    phone:{
      type:String,
      unique:true,
      sparse:true
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    emailVerified: {
      type: Boolean,
      default:false
    },
   
  },
  { timestamps: true }
);

//hash password 
UserModel.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
    
})

// Automatically update "updatedAt" on findOneAndUpdate
UserModel.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

//compare password
UserModel.methods.comparepassword=async function (enterpassword) {
    return await  bcrypt.compare(enterpassword,this.password);
}


module.exports = mongoose.model("user",UserModel);