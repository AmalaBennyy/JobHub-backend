const jobapplications = require('../Model/jobApplicationSchema');


exports.applyForjob = async (req, res) => {
    console.log('inside job add controller');
    const userId = req.payload;
    console.log(userId);
    const cv = req.file.filename;

    const { applicantName, qualification, skills, experience,phone,email,  company,title } = req.body;
    console.log(`${applicantName},${qualification}${skills},${experience},${phone},${email},${cv},${userId}`);

    try {
        const newapplication = new jobapplications({
            applicantName, qualification, skills, experience,phone,email, cv, company,title
        });

        await newapplication.save();
        res.status(200).json(newapplication);

    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }

    // Remove the following line, as it sends an additional response outside the try-catch block
    // res.status(200).json('add project request received');
};



//get all job applications


exports.getalljobApplications=async(req,res)=>{
   
  
   
    
    try{
        const alllist=await jobapplications.find()
        res.status(200).json(alllist)

    }catch(err){
        res.status(500).json(`Request failed due to ${err}`)

    }
}


//delete application

exports.deleteApplication=async(req,res)=>{
    const {id}=req.params
    try{
        const removeapp=await jobapplications.findByIdAndDelete({_id:id})
        res.status(200).json(removeapp)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
 }

// //  // Shortlist a candidate
//  exports.shortlistCandidate = async (req, res) => {
//     const { id } = req.params;
//    try {
//       const selectedCandidate = await jobapplications.findById(id);
//       if (!selectedCandidate) {
//          return res.status(404).json({ message: 'Candidate not found' });
//      }
  
// //       // Create a new instance for the shortlisted candidate
//       const shortlistedCandidate = new jobapplications(selectedCandidate.toObject());
// //       // Optional: You can remove the original job application from the list if needed
//       // await jobapplications.findByIdAndDelete({ _id: id });
  
// //       // Save the shortlisted candidate
//       await shortlistedCandidate.save();
  
//      res.status(200).json(shortlistedCandidate);
//     } catch (err) {
//       res.status(500).json(`Request failed due to ${err}`);
//      }
//    };

// // Controller function for approving a job application
// exports.approveJobApplication = async (req, res) => {
//     const jobId = req.params.id;
  
//     try {
//       // Fetch the job application
//       const jobApplication = await jobapplications.findById(jobId);
  
//       if (!jobApplication) {
//         return res.status(404).json({ message: 'Job Application not found' });
//       }
  
//       // Create a new shortlisted candidate
//       const newShortlistedCandidate = new shortlistedcandidates({
//         applicantName: jobApplication.applicantName,
//         qualification: jobApplication.qualification,
//         skills: jobApplication.skills,
//         experience: jobApplication.experience,
//         cv: jobApplication.cv,
//         userId: jobApplication.userId,
//         company: jobApplication.company,
//         title: jobApplication.title,
//         phone: jobApplication.phone,
//         email: jobApplication.email,
//       });
  
//       // Save the new shortlisted candidate
//       await newShortlistedCandidate.save();
  
//       // If shortlisting is successful, remove the job application
//       await jobapplications.findByIdAndDelete(jobId);
  
//       res.status(200).json(newShortlistedCandidate);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };
  
  
//   // Get all shortlisted candidates
//   exports.getAllShortlistedCandidates = async (req, res) => {
//     try {
//       const allShortlistedCandidates = await jobapplications.find();
//       res.status(200).json(allShortlistedCandidates);
//     } catch (err) {
//       res.status(500).json(`Request failed due to ${err}`);
//     }
//   };
  
//   // Delete shortlisted candidate
//   exports.deleteShortlistedCandidate = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const removeShortlistedCandidate = await jobapplications.findByIdAndDelete({ _id: id });
//       res.status(200).json(removeShortlistedCandidate);
//     } catch (err) {
//       res.status(500).json(`Request failed due to ${err}`);
//     }
//   };