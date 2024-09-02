const {Router} = require("express")
const roleController = Router()
const UserModel = require('../Models/user.model')

roleController.patch('/',async (req,res)=>{
    const {role} = req.body
    if(!role){
        return res.status(404).send({
          status: false,
          message: "All fields are required and cannot be empty.",
        });
    }
    try {
      const userId = "66a7ccbb9102cb328530db6c"
      const user = await UserModel.findById(userId)
      if (!user) {
        return res.status(404)({
          status: false,
          message: "User not found",
        });
      }
      const newRole = {role};
      user.role.push(newRole);
      await user.save();

      res.status(201).send({
        success: true,
        message: "Successfully added.",
        data: user,
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
})


module.exports = {roleController}