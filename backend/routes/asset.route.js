const {Router} =require("express")
const {assetSchema} =require('../Models/asset.model')
const assetController=Router()
// const cloudinary = require("../clodinery");
const multer = require("multer");
const UserModel = require("../Models/user.model");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

assetController.get('/',async(req,res)=>{
    
    try{
       let data= await assetSchema.find()
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
})


assetController.post("/", async (req, res) => {
  const { assetName, service, hospitalId, branchId, departmentId } = req.body;

  if (!assetName || !service ) {
    return res.status(400).send({
      status: false,
      message: "All fields are required and cannot be empty.",
    });
  }
  const specialCharRegex = /^[^a-zA-Z0-9]+$/;

  for (const item of service) {
    const { issue, image, description, status } = item;

    if (!issue) {
      return res.status(400).send({
        success: false,
        message: "Issue name required and cannot be empty.",
      });
    }

    if (!description) {
      return res.status(400).send({
        success: false,
        message: "Description name required and cannot be empty.",
      });
    }

    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Status name required and cannot be empty.",
      });
    }

    if (!Array.isArray(image) || image.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Image must be a non-empty array.",
      });
    }

    for (const url of image) {
      if (!url) {
        return res.status(400).send({
          success: false,
          message: "URL name required and cannot be empty.",
        });
      }
    }
  }

  try {
    const userId = "66897c7d6efb8333efcc0030";
    const newService = service.map((item) => ({
      issue: item.issue,
      image: item.image,
      description: item.description,
      status: item.status,
    }));

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
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

    const newAsset = {
      assetName,
      service: newService,
    };

    console.log("-newAsset---------", newAsset);
    department.asset.push(newAsset);

    await user.save();

    res.status(201).send({
      success: true,
      message: "Successfully added.",
      data: user,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});




assetController.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  const patchData = await assetSchema.findOneAndUpdate({ _id: userId, userId: req.body.userId }, { ...req.body });
  if (patchData) {
    res.send("updated");
  } else {
    res.send("couldn't updated");
  }
});



assetController.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("papapap....", userId);
  try {
    const dataDelete = await assetSchema.findByIdAndDelete(userId);
    if (dataDelete) {
      res.send("Deleted");
    } else {
      res.send("Couldn't delete");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports={assetController}

