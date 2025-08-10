const Navbar = require("../model/navbar.model.js");

// Get Navbar data
exports.getNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne();
    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update Navbar data
exports.saveNavbar = async (req, res) => {
  const { links } = req.body; // expects [{label, url}, {label, url}, {label, url}]

  try {
    let navbar = await Navbar.findOne();
    if (navbar) {
      navbar.links = links;
      await navbar.save();
    } else {
      navbar = new Navbar({ links });
      await navbar.save();
    }
    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
