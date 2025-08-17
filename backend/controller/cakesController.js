import multer from "multer"
import Cakes from "../models/cakes.js"


export const getCakes=async(req,res)=>{
    const cakes=await Cakes.find()
    return res.json(cakes)
}

export const getCake = async (req, res) => {
  try {
      const cake = await Cakes.findById(req.params.id)
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    res.json(cake); // <-- This was missing in your original code
  } catch (err) {
    console.error("Error fetching cake:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const postCakes = async (req, res) => {
    const { name, price, weight, flavors} = req.body;
  
    if (!name || !price || !weight || !flavors || req.file) {
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
// In your cakesController.js
export const updateCake = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, weight, flavors } = req.body;
    
    // Validate input
    if (!name || !price || !weight || !flavors || flavors.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const updatedCake = await Cakes.findByIdAndUpdate(
      id,
      { name, price, weight, flavors },
      { new: true, runValidators: true }
    );
    
    if (!updatedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    
    return res.json(updatedCake);
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteCake = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCake = await Cakes.findByIdAndDelete(id);
    
    if (!deletedCake) {
      return res.status(404).json({ message: "Cake not found" });
    }
    
    return res.json({ message: "Cake deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};