const express =require("express")
const { createStudent,alreadyExist } = require("../../controllers/student/student")
const router = express.Router()
router.post("/createstudent",createStudent)
router.get("/alreadyexist",alreadyExist)
module.exports=router