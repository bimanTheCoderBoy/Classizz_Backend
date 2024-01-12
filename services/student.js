const Student =require("../models/student")
const Errorx =require("../utils/error/customError")
class StudentService{


    static async alreadyExist({email}){
        let student=await Student.findOne({email: email});
        if(student)
        return true
        else   return false
    }


    static async  createStudent({email,name,}) {
     const alreadyExist=await StudentService.alreadyExist({email});
    if(!alreadyExist){
       const newStudent= await Student.create({email,name})
       if(!newStudent) throw new Errorx("Student not created",404);
       newStudent.save();
       return "student created"
    }
    

    }
    static async getStudent({email}){
        let student=await Student.findOne({email:email});
        if (!student) throw new Errorx('No such user found',401);
        return student;
    }

}

module.exports= StudentService;