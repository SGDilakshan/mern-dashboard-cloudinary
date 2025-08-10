const express = require("express");
const router = express.Router();
const footerController = require("../controller/footerController.controller.js");

router.get("/", footerController.getFooter);
router.post("/", footerController.saveFooter);

module.exports = router;
