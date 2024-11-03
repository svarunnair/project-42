const mongoose=require("mongoose");
const { departmentSchema } = require("./department.modal");



const branchSchema=mongoose.Schema({
    branchName:{type:String,required:true},
    department:[departmentSchema]
})


const hospitalSchema=mongoose.Schema({
    hospName:{type:String,required:true},
    branch:[branchSchema]
})

const roles = ["ADMIN", "USER", "GUEST"];

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  hospitals: [hospitalSchema],
  role: { type: String, enum: roles, required: true },
});

// const UserModel=mongoose.model("bmi", userSchema)

module.exports = userSchema;