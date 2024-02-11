//import mongoose
const mongoose=require('mongoose')

//create schema
const companySchema=new mongoose.Schema({
   username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 characters but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value))
              {  
                throw new Error()}
            
        }
    },
    password:{
        type:String,
        require:true
    }
})


//create model
const companies=mongoose.model("companies",companySchema)

//export model
module.exports=companies