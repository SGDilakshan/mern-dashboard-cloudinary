const express = require("express");
const router = express.Router();
const footerController = require("../controller/footerController.controller.js");

router.get("/", footerController.getFooter);
router.post("/", footerController.saveFooter);
router.put("/", footerController.updateFooter);
router.delete("/", footerController.deleteFooter);

module.exports = router;
