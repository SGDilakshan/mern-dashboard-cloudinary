const express = require("express");
const router = express.Router();
const navbarController = require("../controller/navbarController.controller.js");

router.get("/", navbarController.getNavbar);
router.post("/", navbarController.saveNavbar);

module.exports = router;
