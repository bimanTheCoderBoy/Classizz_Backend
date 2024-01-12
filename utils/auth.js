const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Errorx = require("./error/customError");
const jwt =require("jsonwebtoken")
const authCheck=async(req,res,next)=>{
    try {
        
    
    const email=req.body.email
    const token=req.cookies.token
   const isAuth= await jwt.verify(token, process.env.JWTSECRET,);
   if(isAuth){
    const student=await Student.findOne({email})
    if(student){
        res.user={email:student.email,name:student.name,role:student.role}
    }else{
        const teacher =await Teacher.findOne({email})
        res.user={email:teacher.email,name:teacher.name,role:teacher.role}
    }
    next();
   }else{
    next(new Errorx("Unauthorized",404))
   }
} catch (error) {
    next(new Errorx("Unauthorized",404))
}
}

module.exports=authCheck