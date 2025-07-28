import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_URI)
        console.log("Connected");
    }catch(err){
        console.log("CONNECTION FAILED",err.message);
        process.exit()
    }
}

export default connectDb