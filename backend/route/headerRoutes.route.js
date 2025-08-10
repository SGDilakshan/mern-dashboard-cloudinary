const express = require("express");
const router = express.Router();
const headerController = require("../controller/headerController.controller.js");

router.get("/", headerController.getHeader);
router.post("/", headerController.saveHeader);
router.put("/", headerController.updateHeader);       // explicit update
router.delete("/", headerController.deleteHeader); 

module.exports = router;
