import express from "express";
import { login } from "../controllers/authController"; // login stays here
import { createFarmer } from "../controllers/userController"; // correct controller
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/create-farmer", protect, createFarmer);   // can create farmer 

export default router;
