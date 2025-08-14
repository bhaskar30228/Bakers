import multer from "multer"
import Cakes from "../models/cakes.js"


export const getCakes=async(req,res)=>{
    const cakes=await Cakes.find()
    return res.json(cakes)
}

export const getCake=async(req,res)=>{

   const cake=await Cakes.findById(req.params.id)
    
}

export const postCakes = async (req, res) => {
    const { name, price, weight, flavors } = req.body;
    if (!name || !price || !weight || !flavors || !req.file) {
        console.log("Validation failed - missing fields"); 
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newCake = await Cakes.create({
            name,
            price,
            weight,
            flavors,
            image: req.file.filename
        });
        console.log("New cake created:", newCake); 
        return res.json(newCake);
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateCake=(req,res)=>{
    console.log("hello");
    
}

export const deleteCake=(req,res)=>{
    console.log("hello");
    
}