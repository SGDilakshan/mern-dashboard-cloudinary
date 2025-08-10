import Footer from "../models/Footer.js";

// Get footer - assume only one doc, return the first
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne(); // get the single footer doc
    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create footer - add new footer doc
export const createFooter = async (req, res) => {
  try {
    const newFooter = new Footer(req.body);
    await newFooter.save();
    res.status(201).json(newFooter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update footer - update the existing footer document
export const updateFooter = async (req, res) => {
  try {
    // Find the existing footer document (only one expected)
    const footer = await Footer.findOne();

    console.log(req.body.email);  // <-- fixed here

    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }

    // Update footer fields with request body data
    footer.email = req.body.email || footer.email;
    footer.phone = req.body.phone || footer.phone;
    footer.address = req.body.address || footer.address;

    // Save updated document
    const updatedFooter = await footer.save();

    res.json(updatedFooter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
