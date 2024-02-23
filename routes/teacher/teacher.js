const express =require("express")
const { createTeacher,alreadyExist,getTeacher,sendCollabRequest,acceptCollabRequest,getreceivedcollabrequests,getsendcollabrequests,getInstitutes,getMyTeachers, rejectCollabRequest,removeTeacher} = require("../../controllers/teacher/teacher")
const router = express.Router()
router.post("/createteacher",createTeacher)
router.get("/alreadyexist",alreadyExist)
router.get("/getreceivedcollabrequests/:email",getreceivedcollabrequests)
router.get("/getsendcollabrequests/:email",getsendcollabrequests)
router.get("/getmyteachers/:email",getMyTeachers)
router.get("/getinstitutes/:email",getInstitutes)
router.get("/getteacher",getTeacher)
router.put("/sendcollabrequest",sendCollabRequest)
router.put("/acceptcollabrequest",acceptCollabRequest)
router.put("/rejectcollabrequest",rejectCollabRequest)
router.put("/removeteacher",removeTeacher)





module.exports=router