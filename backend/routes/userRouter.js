import express from "express"

const usersRouter=express.Router()

usersRouter.get("/admin",(req,res)=>{
    res.json({message:"Hello admin"})
})
usersRouter.get("/manager",(req,res)=>{
    res.json({message:"Hello manager"})
})
usersRouter.get("/users",(req,res)=>{
    res.json({message:"Hello users"})
})

export default usersRouter
