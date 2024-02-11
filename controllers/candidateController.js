const users=require('../Model/userSchema')

const jwt=require('jsonwebtoken')


exports.userRegister = async(req,res)=>{
    //logic
    console.log("inside controller -register function");
    //extract data from request body
    const{username,email,password}=req.body
    
 try{const existUser=  await users.findOne({email})
 if(existUser){
   //if document present
    res.status(406).json('already user exist')
 }else{
   //register
   //1)create object for  model
   const newUser=new users({
      username,
      email,
      password
   })
   //add to monogobd
  await newUser.save()
  //response
  res.status(200).json(newUser)
 }}catch(err){
   res.status(401).json(`register request failed due to `,err)
 }
   
    //response
   //  res.status(200).json("registration request recieved")
}

//login

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{const existingUser= await users.findOne({email,password})
    console.log(existingUser)
    
    if(existingUser){
       //jwt token
       const token=jwt.sign({userId:existingUser._id},"superkey1234")
       
       res.status(200).json({
          existingUser,
          token
       })
      
    }
    else{
       res.status(404).json('invalid email or password')
    }}catch(err){
       res.status(401).json(`login failed due to ${err}`)
    }
 }

 //get all candidates

exports.getallcandidates=async(req,res)=>{
   
  
   
    
   try{
       const alllist=await users.find()
       res.status(200).json(alllist)

   }catch(err){
       res.status(500).json(`Request failed due to ${err}`)

   }
}

//delete user
exports.deletecandidate=async(req,res)=>{
   const {id}=req.params
   try{
       const removejob=await users.findByIdAndDelete({_id:id})
       res.status(200).json(removejob)
   }
   catch(err){
       res.status(401).json(`Request failed due to ${err}`)
   }
}