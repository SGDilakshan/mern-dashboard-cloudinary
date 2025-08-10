import Navbar from "../models/Navbar.js";

// Get all navbar documents
export const getNavbar = async (req, res) => {
  try {
    const navbars = await Navbar.find();
    res.json(navbars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single navbar document by ID
export const getNavbarById = async (req, res) => {
  try {
    const navbar = await Navbar.findById(req.params.id);
    if (!navbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }
    res.json(navbar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new navbar document
export const createNavbar = async (req, res) => {
  try {
    const newNavbar = new Navbar(req.body);
    await newNavbar.save();
    res.status(201).json(newNavbar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update existing navbar document by ID
export const updateNavbar = async (req, res) => {
  try {
    const { label, url } = req.body;

    const updatedNavbar = await Navbar.findByIdAndUpdate(
      req.params.id,
      { label, url },
      { new: true, runValidators: true }
    );

    if (!updatedNavbar) {
      return res.status(404).json({ message: "Navbar link not found" });
    }

    res.json(updatedNavbar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Optional: Delete navbar document by ID
export const deleteNavbar = async (req, res) => {
  try { 
    const deletedNavbar = await Navbar.findByIdAndDelete(req.params.id);
    if (!deletedNavbar) {
      return res.status(404).json({ message: "Navbar not found" });
    }
    res.json({ message: "Navbar deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
