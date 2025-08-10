import mongoose from "mongoose";

const headerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Header", headerSchema);
