import express from "express";
import { getHeader, createHeader } from "../controller/header.controller.js";

const router = express.Router();

router.get("/", getHeader);
router.post("/", createHeader);

export default router;
