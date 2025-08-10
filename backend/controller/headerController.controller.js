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
