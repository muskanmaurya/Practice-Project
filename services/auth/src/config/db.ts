import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string,{
            dbName: process.env.DB_NAME as string || "zomato_clone",
        });
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("Error while connecting to mongoDB",error);
    }
}

export default connectDB;