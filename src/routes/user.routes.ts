import express from "express";
import { login } from "../controllers/authController"; // login stays here
import { createFarmer } from "../controllers/userController"; // correct controller
import { protect } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/adminOnly";


import {
  getFarmers,
  getFarmer,
  editFarmer,
  removeFarmer,
} from "../controllers/userController";


const router = express.Router();

router.post("/login", login);
router.post("/create-farmer", protect, createFarmer,adminOnly);   // can create farmer 
router.get("/", protect, adminOnly, getFarmers);
router.get("/:id", protect, adminOnly, getFarmer);
router.put("/:id", protect, adminOnly, editFarmer);
router.delete("/:id", protect, adminOnly, removeFarmer);

export default router;
