const Teacher =require("../../models/teacher")
const Student =require("../../models/student")
const Errorx = require("../error/customError")

module.exports=async(req,res,next)=>{
    const email=req.params.email
    if(!email)
    next(new Errorx("not a valid request",404))
    else{
      const teacher= await Teacher.findOne({email:email})
      if(teacher){
        console.log(teacher);
        res.send(true)
      }else{
        const student=await Student.findOne({email})
        if(student){
          console.log(student);
            res.send(true)
        } else{
            res.send(false)
        }
      }
    }
}