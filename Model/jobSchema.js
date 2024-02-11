const mongoose=require('mongoose')
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    company:{
        type:String,
        require:true 
    },
    qualification:{
        type:String,
        require:true
    },
    skills:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    vacancies:{
        type:String,
        require:true

    },
    location:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
   
    
})


//create model
const jobs=mongoose.model("jobs",jobSchema)

//export model
module.exports=jobs