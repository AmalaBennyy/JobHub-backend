
const mongoose=require('mongoose')
const applicationSchema=new mongoose.Schema({

  
    applicantName:{
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
    cv:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    company:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true

    },
    email:{
        type:String,
        require:true
    }
})


const jobapplications=mongoose.model("jobapplications",applicationSchema)

module.exports=jobapplications