import express from "express"
const authRouter=express.Router()
import { userSignUp,userLogin ,getUsers } from "../controller/userController.js"
authRouter.post("/signUp",userSignUp)
authRouter.post("/login",userLogin)
authRouter.get("/",getUsers)
export default authRouter
