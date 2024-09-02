const mongoose=require("mongoose");
const { departmentSchema } = require("./department.modal");



const branchSchema=mongoose.Schema({
    branchName:{type:String,require:true},
    department:[departmentSchema]
})


const hospitalSchema=mongoose.Schema({
    hospName:{type:String,require:true},
    branch:[branchSchema]
})

const roles = ["ADMIN", "USER", "GUEST"];
const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  hospitals: [hospitalSchema],
  role: { type: String, enum: roles, required: true },
});

const UserModel=mongoose.model("bmi", userSchema)

module.exports=UserModel