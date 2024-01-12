const express =require("express")
const { createTeacher,alreadyExist } = require("../../controllers/teacher/teacher")
const router = express.Router()
router.post("/createteacher",createTeacher)
router.get("/alreadyexist",alreadyExist)
module.exports=router