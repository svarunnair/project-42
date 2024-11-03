const mongoose = require("mongoose");
const userSchema = require("../user.model");
// const UserModel = require("../user.model");



const loginSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  data: {userSchema} ,
});


const LoginModel = mongoose.model("bmi", loginSchema);


module.exports =  LoginModel ;