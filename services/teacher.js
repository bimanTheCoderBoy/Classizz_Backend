const Teacher =require("../models/teacher")
const Errorx =require("../utils/error/customError")
class TeacherService{


    static async alreadyExist({email}){
        let teacher=await Teacher.findOne({email: email});
        if(teacher)
        return true
        else   return false
    }


    static async  createTeacher({email,name,}) {
     const alreadyExist=await TeacherService.alreadyExist({email});
    if(!alreadyExist){
       const newTeacher= await Teacher.create({email,name})
       if(!newTeacher) throw new Errorx("Teacher not created",404);
       newTeacher.save();
       
        return "Teacher created"
    }

    }
    static async getTeacher({email}){
        let teacher=await Teacher.findOne({email:email});
        if (!teacher) throw new Errorx('No such user found',401);
        return teacher;
    }

}

module.exports=TeacherService;