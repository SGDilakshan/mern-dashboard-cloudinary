const Footer = require("../model/footer.model.js");

// Get Footer data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update Footer data
exports.saveFooter = async (req, res) => {
  const { email, phoneNumber, address } = req.body;

  try {
    let footer = await Footer.findOne();
    if (footer) {
      footer.email = email;
      footer.phoneNumber = phoneNumber;
      footer.address = address;
      await footer.save();
    } else {
      footer = new Footer({ email, phoneNumber, address });
      await footer.save();
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Explicit update Footer data (only if it exists)
exports.updateFooter = async (req, res) => {
  const { email, phoneNumber, address } = req.body;

  try {
    let footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer data not found" });
    }

    if (email !== undefined) footer.email = email;
    if (phoneNumber !== undefined) footer.phoneNumber = phoneNumber;
    if (address !== undefined) footer.address = address;

    await footer.save();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Footer data
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer data not found" });
    }

    await footer.deleteOne();
    res.json({ message: "Footer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
