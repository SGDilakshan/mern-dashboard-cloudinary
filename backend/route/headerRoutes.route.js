const express = require("express");
const router = express.Router();
const headerController = require("../controller/headerController.controller.js");

router.get("/", headerController.getHeader);
router.post("/", headerController.saveHeader);

module.exports = router;
