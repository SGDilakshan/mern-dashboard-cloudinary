const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: true }); // Make sure _id is enabled for each link (default is true)

const navbarSchema = new mongoose.Schema({
  links: [linkSchema]
});

module.exports = mongoose.model('Navbar', navbarSchema);
