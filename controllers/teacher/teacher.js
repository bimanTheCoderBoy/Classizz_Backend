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

const getTeacher=async(req,res,next)=>{
    try {
        const teacher=await TeacherService.getTeacher(req.body);

        res.send(teacher)
    } catch (error) {
        next(new Errorx("Error creating student",500))
    }
   
}

const sendCollabRequest=async(req,res,next)=>{
    try {
        await TeacherService.sendCollabRequest(req.body);
        res.send({success:true});
    } catch (error) {
        next(new Errorx("Collab Not Send",500))
    }
}

const acceptCollabRequest= async (req,res,next) =>{
    try {
        await TeacherService.acceptCollabRequest(req.body);
        res.send({success:true});
    } catch (error) {
        next(new Errorx("Accept Collab Error",500))
    }
}

const getsendcollabrequests=async(req,res,next)=>{
    try {
       const data= await TeacherService.getSendCollabRequests(req.params);
        res.send({requests:data});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}

const getreceivedcollabrequests=async(req,res,next)=>{
    try {
       const data= await TeacherService.getReceivedCollabRequests(req.params);
        res.send({requests:data});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}


const getMyTeachers=async(req,res,next)=>{
    try {
       const data= await TeacherService.getMyTeachers(req.params);
        res.send({teachers:data});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}


const getInstitutes=async(req,res,next)=>{
    try {
       const data= await TeacherService.getInstitutes(req.params);
        res.send({success:true});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}

const rejectCollabRequest=async(req,res,next)=>{
    try {
       const data= await TeacherService.rejectCollabRequest(req.body);
        res.send({success:true});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}


const removeTeacher=async(req,res,next)=>{
    try {
       const data= await TeacherService.removeTeacher(req.body);
        res.send({success:true});
    } catch (error) {
        next(new Errorx(error.message||"Api Error",error.status||500))
    }
}

module.exports={alreadyExist,createTeacher,getTeacher,sendCollabRequest,acceptCollabRequest,getsendcollabrequests,getreceivedcollabrequests,getInstitutes,getMyTeachers,rejectCollabRequest,removeTeacher}