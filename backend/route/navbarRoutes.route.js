const express = require("express");
const router = express.Router();
const navbarController = require("../controller/navbarController.controller.js");

router.get("/", navbarController.getNavbar);                 // GET all links
router.post("/addlink", navbarController.addNavbarLink);    // POST add one link
router.post("/update", navbarController.saveNavbar);         // POST replace all links
router.put("/link/:linkId", navbarController.updateNavbarLink);
router.delete("/link/:linkId", navbarController.deleteNavbarLink);


module.exports = router;
