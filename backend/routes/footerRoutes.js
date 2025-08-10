import express from "express";
import { getFooter, createFooter,updateFooter } from "../controller/footer.controller.js";

const router = express.Router();

router.get("/", getFooter);
router.post("/", createFooter);
router.put('/update', updateFooter);

export default router;
