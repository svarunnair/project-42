

const mongoose=require("mongoose")


const BmiSchema=mongoose.Schema({
    BMI:{type:String,require:true},
    height:{type:String,require:true},
    weight:{type:String,require:true},
    user_id:{type:String,require:true}
})

const BmiModel=mongoose.model("bmiValues", BmiSchema)

module.exports=BmiModel