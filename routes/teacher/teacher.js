const express =require("express")
const { createTeacher,alreadyExist,getTeacher,sendCollabRequest,acceptCollabRequest } = require("../../controllers/teacher/teacher")
const router = express.Router()
router.post("/createteacher",createTeacher)
router.get("/alreadyexist",alreadyExist)
router.get("/getteacher",getTeacher)
router.put("/sendcollabrequest",sendCollabRequest)
router.put("/acceptcollabrequest",acceptCollabRequest)
module.exports=router