import multer from "multer"
import Cakes from "../models/cakes.js"

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname
    cb(null,filename)
  }
})

export const upload = multer({ storage:storage });



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
        console.log("Validation failed - missing fields"); // Debug 4
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
        console.log("New cake created:", newCake); // Debug 5
        return res.json(newCake);
    } catch (err) {
        console.error("Database error:", err); // Debug 6
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateCake=(req,res)=>{
    console.log("hello");
    
}

export const deleteCake=(req,res)=>{
    console.log("hello");
    
}