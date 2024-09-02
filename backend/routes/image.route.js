const {Router} = require("express")
const imgController = Router()
// const imageSchema= require("../Models/service.model")
const UserModel = require("../Models/user.model")


imgController.post('/',async(req,res)=>{
    const {url} = req.body
    if(!url){
       return res.status(400).send({
         status: false,
         message: "All fields are required and cannot be empty.",
       });
    }
    try{
        const userId = "66897c7d6efb8333efcc0030";
        const user = await UserModel.findById(userId);
        console.log("ffff",user)
        if(!user){
           return res.status(400).send({
             status: false,
             message: "User is not found.",
           }); 
        }
        const hospital = user.hospitals.id("66897c7d6efb8333efcc0031");
        if (!hospital) {
          return res.status(404).send({
            success: false,
            message: "Hospital not found.",
          });
        }

        const branch = hospital.branch.id("66897c7d6efb8333efcc0032");
        if (!branch) {
          return res.status(404).send({
            success: false,
            message: "Branch not found.",
          });
        }

        const department = branch.department.id("66897c7d6efb8333efcc0033");
        if (!department) {
          return res.status(404).send({
            success: false,
            message: "Department not found.",
          });
        }

        const asset = department.asset.id("66897c7d6efb8333efcc0034");
        if (!asset) {
          return res.status(404).send({
            success: false,
            message: "Asset not found.",
          });
        }

        const service = asset.service.id("66897c7d6efb8333efcc0035");
        if (!service) {
          return res.status(404).send({
            success: false,
            message: "Asset not found.",
          });
        }

        const newImg ={url}
        service.image.push(newImg)
        await user.save()

        res.status(201).send({
          success: true,
          message: "Successfully added.",
          data: user,
        });

    }
    catch(err){
        res.status(500).send({ error: err.message });
    }
})






module.exports = {imgController}
