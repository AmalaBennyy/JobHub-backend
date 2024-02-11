//import dotenv
require('dotenv').config()

//import express
const express=require('express')

//import cors
const cors=require('cors')

const path = require('path');

//import router
const router=require('./Routers/router')

//import connection
require('./DB/connection')

//create server
const jobServer=express()

//use cors in server
jobServer.use(cors())


jobServer.use(express.json())

//use router
jobServer.use(router)

jobServer.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port=4700 || process.env

jobServer.listen(port,()=>{
    console.log(`server running at port ${port}`)
})

jobServer.get('/',(req,res)=>{
    res.send(`jobfair server running and ready to accept request`)

})