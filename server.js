const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const mongoose = require('mongoose')
const dbConnect =require("./utils/db")
const errorHandler=require("./utils/error/handler")
const studentRoutes=require("./routes/student/student")
const teacherRoutes=require("./routes/teacher/teacher")
const cookieParser=require("cookie-parser")
const authMiddleWare=require("./utils/auth")
const userRoutes=require("./routes/user")

const setRun=async()=>{
    await dbConnect();
    const  app=express();
    app.use(cors({credentials:true,origin:"http://localhost:5173"}));  
    app.use(express.json())
    app.use(cookieParser())   
     
    app.use("/user",userRoutes)
    app.use("/student",studentRoutes)
    app.use("/teacher",teacherRoutes)
    app.use(authMiddleWare)
    app.get("*",(req,res,next)=>{
        res.send(res.user)
    })
    app.use(errorHandler)
    const PORT=process.env.PORT||4500
    app.listen(PORT,()=>{
        console.log(`listening at http://localhost:${PORT}`);
    })

}

setRun();