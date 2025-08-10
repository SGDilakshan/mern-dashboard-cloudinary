import express from "express";
import {
  getNavbar,
  getNavbarById,
  createNavbar,
  updateNavbar,
  deleteNavbar,
} from "../controller/navbar.controller.js";

const router = express.Router();
router.get("/", getNavbar);
router.get("/:id", getNavbarById);
router.post("/", createNavbar);
router.put("/:id", updateNavbar);
router.delete("/:id", deleteNavbar);

export default router;
