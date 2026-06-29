import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoute from "./routes/user.routes.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use("/api/auth",authRoute);

app.get("/",(req,res)=>{
    res.send("Hello from the auth service!")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} `)
    connectDB();
})