const Header = require("../model/header.model.js");

// Get Header data
exports.getHeader = async (req, res) => {
  try {
    const header = await Header.findOne();
    res.json(header);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update Header data
exports.saveHeader = async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    let header = await Header.findOne();
    if (header) {
      header.title = title;
      header.imageUrl = imageUrl;
      await header.save();
    } else {
      header = new Header({ title, imageUrl });
      await header.save();
    }
    res.json(header);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update existing Header
exports.updateHeader = async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    let header = await Header.findOne();
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }

    if (title !== undefined) header.title = title;
    if (imageUrl !== undefined) header.imageUrl = imageUrl;

    await header.save();
    res.json(header);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete the Header data (if you want to reset/remove it)
exports.deleteHeader = async (req, res) => {
  try {
    const header = await Header.findOne();
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }

    await header.deleteOne();
    res.json({ message: "Header deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

