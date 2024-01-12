const express =require("express")
const { createStudent,alreadyExist,getStudent } = require("../../controllers/student/student")
const router = express.Router()
router.post("/createstudent",createStudent)
router.get("/alreadyexist",alreadyExist)
router.get("/getstudent",getStudent)
module.exports=router