import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  flavors: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Cakes = mongoose.model("Cakes", cakeSchema);
export default Cakes;
