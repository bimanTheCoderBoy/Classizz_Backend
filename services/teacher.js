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

    static async sendCollabRequest({collabCode,email}){
        const teacher=await Teacher.findOne({email:email});
        if(!teacher)throw new Errorx('User Not Found','404');
        const instrituteTeacher=await Teacher.findOneAndUpdate({institutecode:collabCode},{$push:{receivedCollab:teacher._id}})
        if(!instrituteTeacher)throw new Errorx('User Not Found','404');
        await Teacher.findOneAndUpdate({email:email},{$push:{sendCollab:instrituteTeacher._id}});
    }
    static async acceptCollabRequest({instrituteEmail,teacherId}){
        //
        await Teacher.findOneAndUpdate({email:instrituteEmail},{$push:{myteachers:teacherId}})
        await Teacher.findOneAndUpdate({email:instrituteEmail},{$pull:{receivedCollab:teacherId}})

        //
        const institute=await Teacher.findOne({email:instrituteEmail})
        if(!institute)throw new Errorx('User Not Found','404');
        await Teacher.findByIdAndUpdate(teacherId,{$push:{joinedInstitutes:institute._id}})
        await Teacher.findByIdAndUpdate(teacherId,{$pull:{sendCollab:institute._id}})
    }

}

module.exports=TeacherService;