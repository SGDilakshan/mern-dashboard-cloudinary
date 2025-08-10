import Header from "../models/Headers.js";

export const getHeader = async (req, res) => {
  try {
    const header = await Header.find();
    res.json(header);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHeader = async (req, res) => {
  try {
    const newHeader = new Header(req.body);
    await newHeader.save();
    res.status(201).json(newHeader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
