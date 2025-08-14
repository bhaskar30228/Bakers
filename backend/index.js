import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/AuthRoutes.js"
import cakesRouter from "./routes/cakesRoute.js"
import connectDb from "./config/Db.js"
import cors from "cors"
import usersRouter from "./routes/userRouter.js"
dotenv.config()
const app=express()
app.use(express.json())  
app.use(express.static("public"))
const allowedOrigins = ['https://bakers-xi.vercel.app', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


connectDb()
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.use("/auth",authRouter)
app.use("/cakes",cakesRouter)
app.use("/user",usersRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
