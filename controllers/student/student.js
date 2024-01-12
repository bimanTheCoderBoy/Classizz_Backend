const StudentService =require("../../services/student")
const Errorx = require("../../utils/error/customError")
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
        const student=await StudentService.createStudent(req.body)
        res.send(student)
    } catch (error) {
        next(new Errorx(error.message,error.status)); 
    }
}

module.exports={alreadyExist,createStudent}