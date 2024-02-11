//logic to resolve request

//import model
const companies=require('../Model/companySchema')

//import jwt
const jwt=require('jsonwebtoken')



//register request

exports.register = async(req,res)=>{
    //logic
    console.log("inside controller -register function");
    //extract data from request body
    const{username,email,password}=req.body
    
 try{const existUser=  await companies.findOne({email})
 if(existUser){
   //if document present
    res.status(406).json('already user exist')
 }else{
   //register
   //1)create object for  model
   const newCompany=new companies({
      username,
      email,
      password
   })
   //add to monogobd
  await newCompany.save()
  //response
  res.status(200).json(newCompany)
 }}catch(err){
   res.status(401).json(`register request failed due to `,err)
 }
   
    //response
   //  res.status(200).json("registration request recieved")
}

//login request
exports.login=async(req,res)=>{
   const {email,password}=req.body
   try{const existingCompany= await companies.findOne({email,password})
   console.log(existingCompany)
   
   if(existingCompany){
      //jwt token
      const token=jwt.sign({userId:existingCompany._id},"superkey123")
      
      res.status(200).json({
         existingCompany,
         token
      })
     
   }
   else{
      res.status(404).json('invalid email or password')
   }}catch(err){
      res.status(401).json(`login failed due to ${err}`)
   }
}


//get all companies

exports.getallcompany=async(req,res)=>{
   
  
   
    
   try{
       const alllist=await companies.find()
       res.status(200).json(alllist)

   }catch(err){
       res.status(500).json(`Request failed due to ${err}`)

   }
}

//delete company
exports.deletecompany=async(req,res)=>{
   const {id}=req.params
   try{
       const removejob=await companies.findByIdAndDelete({_id:id})
       res.status(200).json(removejob)
   }
   catch(err){
       res.status(401).json(`Request failed due to ${err}`)
   }
}
