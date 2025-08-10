import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Footer", footerSchema);
