const express=require("express")
const router = express.Router()
const alreadyExist=require("../utils/user/user")

router.get("/alreadyexist",alreadyExist);

module.exports=router