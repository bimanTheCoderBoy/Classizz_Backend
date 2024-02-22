const StudentService =require("../../services/student")
const Errorx = require("../../utils/error/customError")
const jwt=require("jsonwebtoken")
const alreadyExist=async(req,res,next)=>{
    try{
        const value=await StudentService.alreadyExist(req.body)
        res.send(value)
    }catch(error){
        res.send(false)
    }
    
}

const createStudent=async(req,res,next)=>{
    try {
        const student=await StudentService.createStudent(JSON.parse(req.body))
        const token = jwt.sign(req.body.email, process.env.JWTSECRET,);

        // Set the JWT as a cookie
        res.cookie('token', token, { httpOnly: true });
        res.send(student||"user exits")
    } catch (error) {
        next(new Errorx(error.message,error.status)); 
    }
}


const getStudent=(req,res,next)=>{
    try {
        const student=StudentService.getStudent(req.body);

        res.send(student)
    } catch (error) {
        next(new Errorx("Error creating student",500))
    }
   
}


module.exports={alreadyExist,createStudent,getStudent}