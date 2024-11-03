const express = require("express")
const { connection } = require("./db")
var jwt = require('jsonwebtoken');
const app=express()
var cors = require('cors')
const bcrypt = require('bcrypt');
const authentication=require("./middleware/authentication");
const { assetController } = require("./routes/asset.route");
const { depController } = require("./routes/department.route");
const { serviceController } = require("./routes/service.route");
const { userController } = require("./routes/user.route");
const {imgController} = require("./routes/image.route");
const { roleController } = require("./routes/role.route");
const { branchController } = require("./routes/branch.route");
const { loginController } = require("./routes/authRoute/login.route");
app.use(express.json())
require("dotenv").config()
app.use(cors())


app.use("/login", loginController);
app.use('/user',userController)
app.use('/asset',assetController)
app.use('/dep',depController)
app.use("/service", serviceController);
app.use("/image", imgController);
app.use("/role", roleController);
app.use("/branch", branchController);


app.get("/",(req,res)=>{
    res.send("Home page..............")
})



app.listen(9090,async()=>{

    try{
        await connection
        console.log("Running on 9090")
    }
    catch(err){
        console.log(err, "Not connected ")
    }
  
})