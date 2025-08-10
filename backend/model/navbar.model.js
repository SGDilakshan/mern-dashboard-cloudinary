const mongoose = require("mongoose");

const navbarSchema = new mongoose.Schema({
  links: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Navbar", navbarSchema);
