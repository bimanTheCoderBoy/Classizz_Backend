const express =require("express")
const { createTeacher,alreadyExist,getTeacher } = require("../../controllers/teacher/teacher")
const router = express.Router()
router.post("/createteacher",createTeacher)
router.get("/alreadyexist",alreadyExist)
router.get("/getteacher",getTeacher)
module.exports=router