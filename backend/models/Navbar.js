import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Navbar", navbarSchema);
