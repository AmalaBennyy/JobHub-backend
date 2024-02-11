const jobs=require('../Model/jobSchema')
// exports.addjob =async(req,res)=>{
//     console.log('inside job add controller');
     
//  const userId = req.payload
//     console.log(userId);
  
   
   
//     const{title,company,qualification,skills,experience,description,vacancies,location}=req.body
//      console.log(`${title},${company}${qualification},${skills},${experience},${description},${vacancies},${location},${userId}}`);


//     try{
        

//             const newProject = new jobs({
//                 title,company,qualification,skills,experience,description,vacancies,location,userId

//             })
//             await newProject.save()
//              res.status(200).json(newProject)
        

//      }catch(err){
//         res.status(401).json(`Request failed due to ${err}`)
//      }


//     res.status(200).json('add project request recieved')



// }


exports.addjob = async (req, res) => {
    console.log('inside job add controller');
     
    const userId = req.payload;
    console.log(userId);
  
    const { title, company, qualification, skills, experience, description, vacancies, location } = req.body;
    console.log(`${title},${company}${qualification},${skills},${experience},${description},${vacancies},${location},${userId}`);

    try {
        const newProject = new jobs({
            title, company, qualification, skills, experience, description, vacancies, location, userId
        });

        await newProject.save();
        res.status(200).json(newProject);

    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
}


//job list
exports.getcompanyDashjob=async(req,res)=>{
    const userId=req.payload
    try{
        const companyjoblist=await jobs.find({userId})
        res.status(200).json(companyjoblist)

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//get all job list
exports.getalljoblist=async(req,res)=>{
 
    
    try{
        const alljobs=await jobs.find()
        res.status(200).json(alljobs)

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }
}

//alljob with search
exports.getalljob=async(req,res)=>{
    const search=req.query.search
    console.log(search);
    const query={
        title:{
            //regular expression , options -it removes case sensitivity
        $regex:search,
        $options:'i'


        },
        
    }
    
    try{
        const allproject=await jobs.find(query)
        res.status(200).json(allproject)

    }catch(err){
        res.status(500).json(`Request failed due to ${err}`)

    }
}


//delete job

exports.deletejob=async(req,res)=>{
    const {id}=req.params
    try{
        const removejob=await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(removejob)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
 }


 //update  job vaccaniy

 exports.editJob=async(req,res)=>{

    const{id}=req.params
    const userId=req.payload
    const{vacancies}=req.body
   

try{
    const updateJob=await jobs.findByIdAndUpdate(
        {_id:id},{vacancies,userId},{new:true} )
        await updateJob.save()
        res.status(200).json(updateJob)
        
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)


    }
}
