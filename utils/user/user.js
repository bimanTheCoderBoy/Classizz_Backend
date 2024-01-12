const Teacher =require("../../models/teacher")
const Student =require("../../models/student")
const Errorx = require("../error/customError")

module.exports=(req,res,next)=>{
    const email=req.body.params
    if(!email)
    next(new Errorx("not a valid request",404))
    else{
      const teacher=  Teacher.findOne({email:email})
      if(teacher){
        res.send(true)
      }else{
        const student=Student.findOne({email})
        if(student){
            res.send(true)
        } else{
            res.send(false)
        }
      }
    }
}