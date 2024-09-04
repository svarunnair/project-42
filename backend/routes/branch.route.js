const {Router} = require ("express");
const UserModel = require("../Models/user.model");
const branchController = Router()



branchController.post("/", async (req, res) => {
  const { branchName} = req.body;

  if (!branchName) {
    return res.status(400).send({
      status: false,
      message: "All fields are required and cannot be empty.",
    });
  }

  try {
    const userId = "66d4a4f5543e63a92da5d00d";
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    const hospital = user.hospitals.id("66d4a4f5543e63a92da5d00e");
    console.log('..hospital..',hospital)

    if (!hospital) {
      return res.status(404).send({
        success: false,
        message: "Hospital not found.",
      });
    }

    const newBranch = {
      branchName: branchName,
      department: [],
      // _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the branch
    };

    hospital.branch.push(newBranch);

    await user.save();

    return res.status(201).send({
      success: true,
      message: "Successfully added.",
      data: user,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send({
      success: false,
      message: "An error occurred.",
    });
  }
});



module.exports = {branchController}