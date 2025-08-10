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

// Add one link to existing navbar links
exports.addNavbarLink = async (req, res) => {
  const { label, url } = req.body; // single link

  if (!label || !url) {
    return res.status(400).json({ message: "Label and URL are required" });
  }

  try {
    let navbar = await Navbar.findOne();

    if (navbar) {
      navbar.links.push({ label, url });
      await navbar.save();
    } else {
      navbar = new Navbar({ links: [{ label, url }] });
      await navbar.save();
    }

    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Replace all navbar links at once
exports.saveNavbar = async (req, res) => {
  const { links } = req.body; // expects [{label, url}, {label, url}, ...]

  if (!Array.isArray(links)) {
    return res.status(400).json({ message: "Links must be an array" });
  }

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

// Update one navbar link by linkId
exports.updateNavbarLink = async (req, res) => {
  const { linkId } = req.params; // link document _id
  const { label, url } = req.body;

  if (!label || !url) {
    return res.status(400).json({ message: "Label and URL are required" });
  }

  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      return res.status(404).json({ message: "Navbar data not found" });
    }

    // Find the link by id in the links array
    const link = navbar.links.id(linkId);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Update the link fields
    link.label = label;
    link.url = url;

    await navbar.save();

    res.json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 

exports.deleteNavbarLink = async (req, res) => {
  const { linkId } = req.params;

  try {
    const navbar = await Navbar.findOne();
    if (!navbar) return res.status(404).json({ message: "Navbar data not found" });

    // Filter links array to remove the one with matching _id
    const originalLength = navbar.links.length;
    navbar.links = navbar.links.filter(link => link._id.toString() !== linkId);

    if (navbar.links.length === originalLength) {
      return res.status(404).json({ message: "Link not found" });
    }

    await navbar.save();

    res.json({ message: "Link deleted successfully", navbar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



