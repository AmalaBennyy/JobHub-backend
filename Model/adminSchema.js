const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const adminSchema=new mongoose.Schema({
    
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
adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password') || admin.isNew) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      admin.password = hashedPassword;
    }
    next();
  });


//create model
const admins=mongoose.model("admins",adminSchema)

//export model
module.exports=admins