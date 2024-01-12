const TeacherService =require("../../services/teacher")
const Errorx = require("../../utils/error/customError")
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
        res.send(Teacher)
    } catch (error) {
        next(new Errorx(error.message,error.status)); 
    }
}

module.exports={alreadyExist,createTeacher}