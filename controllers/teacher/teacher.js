const { exists } = require("../../models/teacher")
const TeacherService =require("../../services/teacher")
const Errorx = require("../../utils/error/customError")
const jwt=require("jsonwebtoken")
const alreadyExist=async(req,res,next)=>{
    // console.log(req.body);
    try{
        const value=await TeacherService.alreadyExist(req.body)
        res.send(value)
    }catch(error){
        res.send(false)
    }
}

const createTeacher=async(req,res,next)=>{
    // console.log(req.body);
    try {
        const Teacher=await TeacherService.createTeacher(req.body)
        const token = jwt.sign(req.body.email, process.env.JWTSECRET,);

        // Set the JWT as a cookie
        res.cookie('token', token, { httpOnly: true });
        res.send(Teacher||"user exists")
    } catch (error) {
        next(new Errorx(error.message,error.status)); 
    }
}

const getTeacher=(req,res,next)=>{
    try {
        const teacher=TeacherService.getTeacher(req.body);

        res.send(teacher)
    } catch (error) {
        next(new Errorx("Error creating student",500))
    }
   
}

module.exports={alreadyExist,createTeacher,getTeacher}