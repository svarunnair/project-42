const { Router } = require("express");
const UserModel = require("../Models/user.model");
const userController = Router();

userController.post('/',async(req,res)=>{
    const {name,email,password,hospitals,role} =req.body
    console.log(",,.name.,name..", name);
     console.log(",,.name.,password..", password);
    if (!name || !email || !password || !role) {
     res.status(400).send({success: false, message: "Name, email,password,role are required and cannot be empty.."});
    }
  if (!["ADMIN", "USER", "GUEST"].includes(role)) {
    return res.status(400).send({
      success: false,
      message:
        "Role is not valid. Only ADMIN, USER, or GUEST roles are allowed.",
    });
  }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({success: false,message:"Invalid email format."});
    }
    if (!Array.isArray(hospitals) || hospitals.length === 0) {
      return res.status(400).send({success: false,message: "Hospitals must be a non-empty array."});
    }
    for (const item of hospitals) {
      const { hospName, branch } = item;
      if(!hospName){
        res.status(400).send({success: false, message: "Hospital name required and cannot be empty.."});
    }
    for (const item of branch) {
      const { branchName, department } = item;
      if(!branchName){
        res.status(400).send({success: false, message: "Branch name required and cannot be empty.."});
    }
    }
    }
    
    try{
        const userData = await new UserModel({
          name :name,
          email : email,
          password : password,
          hospitals : hospitals,
          role : role,
        });

        userData.save()
        res.send({status:true, message:"Data added successfully."})

    }
    catch(err){
        res.status(500).send({ error: err.message });
    }


})

userController.get('/',async(req,res)=>{

  try{
    const allData = await UserModel.find({})
   
    res.send(allData)
  }
  catch(err){
    console.log("error",err)
  }

})







module.exports = { userController };
