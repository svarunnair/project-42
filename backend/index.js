const express = require("express")
const { connection } = require("./db")
var jwt = require('jsonwebtoken');
const app=express()
var cors = require('cors')
const bcrypt = require('bcrypt');
const UserModel=require("./Models/user.model")
const BmiModel=require("./Models/bmi.model")
const authentication=require("./middleware/authentication")
app.use(express.json())
require("dotenv").config()
app.use(cors())



app.get("/",(req,res)=>{
    res.send("Home page..............")
})

app.post("/data",(req,res)=>{
    const {email,password}=req.body
    res.send("Data received")
})


app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body
    const isUser = await UserModel.findOne({email})
    if(isUser){
        res.send("User already exist,try login")
    }
    bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send({"msg":"Something went wrong try after some time"})
        }
        else{
            const new_user =new UserModel({
                name,
                email,
                password:hash
            })
            try{
                await new_user.save()
                res.send({"msg":"Signup Successfully"})
            }
            catch(err){
                res.send({"msg":"Something went wrong try after some time"})
            }
        }
    }); 
})


app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user = await UserModel.findOne({email})
    if(!user){
        res.send("please login...........")
    }
    else{
    const hashed_password = user.password
    const user_id = user._id
    bcrypt.compare(password, hashed_password, function(err, result) {

        if(err){
            res.send({"msg":"something went wromg"})
        }
        if(result){
            const token= jwt.sign({ user_id}, process.env.SECRECT_CODE);
            res.send({"msg":"Login Successfull", token})
        }
        else{
            res.send({"msg":"Login failed"})
        } 
   });
}
})


app.get("/getProfile",authentication ,async(req,res)=>{
    const {user_id}=req.body
    const user = await UserModel.findOne({_id:user_id})
    const {name,email} = user
    res.send({name,email})
})


app.post("/calculateBMI",authentication,async(req,res)=>{
    const {height,weight,user_id}=req.body
    const height_in_meter =Number(height)*.3048
    const BMI = Number(weight)/(height_in_meter )**2
    const new_bmi = new BmiModel({
        BMI,
        height:height_in_meter,
        weight,
        user_id
    })
    await new_bmi.save()
    res.send({BMI})
})

app.get("/getCalculation",authentication,async(req,res)=>{
    const {user_id}=req.body
    const all_bmi= await BmiModel.findOne({ user_id:user_id})
    res.send({history:all_bmi})
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