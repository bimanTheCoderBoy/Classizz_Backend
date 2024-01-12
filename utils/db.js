const mongoose=require("mongoose")

const dbConnect=async()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connected"); 
    } catch (error) {
        console.log("DB Error: ",error);
    }
}

module.exports=dbConnect;