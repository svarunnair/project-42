const {Router} = require('express')
const LoginModel = require('../../Models/authModal/login.model.jsx')
// const { LoginModel } = require('../../Models/authModal/login.model')




const loginController = Router()


loginController.post('/', async(req,res)=>{
    const {name,email,password} = req.body
    if(!name||!email||!password){
        res.send("All fields are mandatory")
    }
    try{
        let data = await LoginModel({
            name : name,
            email : email,
            password : password
        })
        data.save()
        res.send({status:true,message:"Login successful"})
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
})



module.exports = { loginController };