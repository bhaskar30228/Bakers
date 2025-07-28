import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userSignUp=async(req,res)=>{
    const{username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(400).json({message:"All fiels are required"})
    }
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({error:"Email already exist"})
    }
    const hashedPassword=await bcrypt.hash(password,12)
    const newUser=await User.create({
        username,
        email,
        password:hashedPassword
    })

    const token =jwt.sign({email:newUser.email,id:newUser._id},process.env.SECRET_KEY,{
        expiresIn:"2h"
    })
    return res.status(200).json({token,user:newUser })
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );
    console.log(token);
    
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export const getUsers=async(req,res)=>{
    const users=await User.find()
    
}