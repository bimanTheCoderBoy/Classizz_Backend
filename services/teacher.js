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
    static async checkReceiveCollab(tecrId,institutecode){
        try {
        const ans=await Teacher.find({institutecode,$in:{receivedCollab:tecrId}});
        console.log(ans);
        return ans.length==0;
        } catch (error) {
            return false;
        }
        
    }
    static async checkSendCollab(instId,email){
        try {
        const ans=await Teacher.find({email,$in:{sendCollab:instId}});
        console.log(ans);
        return ans.length==0;
        } catch (error) {
            return false
            // throw new Errorx('User Not Found','404');
           // throw new Errorx('Already Sent Request','409')
        }
        
    }
    static async sendCollabRequest({collabCode,email}){
        const teacher=await Teacher.findOne({email:email});
        if(!teacher)throw new Errorx('User Not Found','404');


        let instrituteTeacher=null;
        if(TeacherService.checkReceiveCollab(teacher._id,collabCode)){
         instrituteTeacher=await Teacher.findOneAndUpdate({institutecode:collabCode},{$push:{receivedCollab:teacher._id}})
        }

        if(!instrituteTeacher)throw new Errorx('User Not Found','404');
        if(TeacherService.checkSendCollab(instrituteTeacher._id,email)){
        await Teacher.findOneAndUpdate({email:email},{$push:{sendCollab:instrituteTeacher._id}});
        }
    }


    // static async checkJoinedInstitutes(tecrId,instituteId){
    //     const ans=await Teacher.find({institutecode,$in:{receivedCollab:tecrId}});
    //     return ans.length==0;
    // }
    // static async checkMyteachers(instrituteEmail,teacherId){
    //     const ans=await Teacher.find({email,$in:{sendCollab:instId}});
    //     return ans.length==0;
    // }

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

    static async  rejectCollabRequest({instrituteEmail,teacherId}) {
        await Teacher.findOneAndUpdate({email:instrituteEmail},{$pull:{receivedCollab:teacherId}})

         //
         const institute=await Teacher.findOne({email:instrituteEmail})
         if(!institute)throw new Errorx('User Not Found','404');
         await Teacher.findByIdAndUpdate(teacherId,{$pull:{sendCollab:institute._id}})
        
    }

    static async getReceivedCollabRequests(email){
        try {
        const data=await Teacher.findOne(email).populate({path:'receivedCollab',select:'email'});
        return data.receivedCollab
        } catch (error) {
            throw new Errorx('Error Getting Requests','403');
        }
        
    }

    static async getSendCollabRequests(email){
        try {
        const data=await Teacher.findOne(email).populate({path:'sendCollab',select:'email'});
        return data.sendCollab
        } catch (error) {
            throw new Errorx('Error Getting Requests','403');
        }
        
    }


    static async getInstitutes(email){
        try {
            const data=await Teacher.findOne(email).populate({path:'joinedInstitutes',select:'email name'});
            return data.joinedInstitutes
            } catch (error) {
                throw new Errorx('Error Getting Institutes','403');
            }
    }

    static async getMyTeachers(email){
        try {
            const data=await Teacher.findOne(email).populate({path:'myteachers',select:'email name'});
            const self=await Teacher.findOne(email,'_id email name');
            return [self,...data.myteachers]
            } catch (error) {
                throw new Errorx('Error Getting Teachers','403');
            }
    }

    static async removeTeacher({email,teacherId}){
        try {
           const insTeacher= await Teacher.findOneAndUpdate({email},{$pull:{myteachers:teacherId}})
           if(!insTeacher)throw new Errorx('Teacher Not Found','404');
            await Teacher.findByIdAndUpdate(teacherId,{$pull:{joinedInstitutes:insTeacher._id}})
           
            } catch (error) {
                // console.log(error);
                throw new Errorx('Error removing teacher','403');
            }
    }
}

module.exports=TeacherService;