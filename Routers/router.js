//set up path to resolve request

//1)import express module
const express=require('express')

const jwt = require('jsonwebtoken');

// Middleware to verify and extract the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, 'superkey1234', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};


//import controller
const companyController=require('../controllers/companyController')
const candidateController=require('../controllers/candidateController')
const jobController=require('../controllers/jobController')

const adminController=require('../controllers/adminController')

const applyjobController=require('../controllers/applicationController')

//multer
const multerConfig=require('../Middleware/multerMiddleware')

//import jwt middleware
const jwtMiddleware=require('../Middleware/jwtMiddleware')

//import jwtuser
const jwtuserMiddleware=require('../Middleware/jwtUser')

//2)create an object for router class inside express module
const router= new express.Router()

//3)setup path to resolve request
 //a)company register
     router.post('/companies/register',companyController.register)

 //b) company login
 router.post('/company/login',companyController.login)   
 
 //c)candidate register
 router.post('/candidate/register',candidateController.userRegister)

 //d)candidate login
 router.post('/candidate/login',candidateController.login)

 //e)add job
 router.post('/jobs/add',jwtMiddleware,jobController.addjob)


//f)get company dashboard job list

router.get('/dashboard/joblist',jwtMiddleware,jobController.getcompanyDashjob)

//g)all jobs with serach
router.get('/jobs/alljobs',jwtuserMiddleware,jobController.getalljob)

//get all job
router.get('/alljobs',jobController.getalljoblist)

//h)delete job
router.delete('/job/remove/:id',jwtMiddleware,jobController.deletejob)

//h)applyjob
router.post('/jobs/apply',jwtuserMiddleware,multerConfig.single('cv'),applyjobController.applyForjob)

//get job application
router.get('/jobs/application',applyjobController.getalljobApplications)

//delete job application

router.delete('/application/remove/:id',jwtMiddleware,applyjobController.deleteApplication)

//update vacancy
router.put('/job/edit/:id',jwtMiddleware,jobController.editJob)

//get all company
router.get('/allcompanies',companyController.getallcompany)

//get all candidates
router.get('/allCandidates',candidateController.getallcandidates)


// //shorlist
// router.post('/jobs/shortlist/:id', jwtMiddleware,applyjobController.approveJobApplication);

// // Get all shortlisted candidates
// router.get('/jobs/shortlisted-candidates', applyjobController.getAllShortlistedCandidates);

// // Delete shortlisted candidate
// router.delete('/shortlisted-candidates/remove/:id', applyjobController.deleteShortlistedCandidate);
router.post('/admin/login', adminController.adminLogin)

//delete company
router.delete('/company/remove/:id',verifyToken,companyController.deletecompany)

//delete candidate
router.delete('/candidate/remove/:id',verifyToken,candidateController.deletecandidate)

//h)delete job by admin
router.delete('/admin/job/remove/:id',verifyToken,jobController.deletejob)


//4)export router
module.exports = router