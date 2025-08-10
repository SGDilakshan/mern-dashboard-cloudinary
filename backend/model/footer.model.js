const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Footer", footerSchema);
