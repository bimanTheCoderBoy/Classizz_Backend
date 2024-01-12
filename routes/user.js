const express=require("express")
const router = express.Router()
const alreadyExist=require("../utils/user/user")

router.get("/alreadyexits",alreadyExist);

module.exports=router