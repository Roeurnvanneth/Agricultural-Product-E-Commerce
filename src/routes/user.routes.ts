import express from "express";
import { login,registerCustomer,createUserByAdmin } from "../controllers/authController"; // login stays here
import { createFarmer } from "../controllers/userController"; // correct controller
import { protect } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/adminOnly";


import {
  getFarmers,
  getFarmer,
  editFarmer,
  removeFarmer,
  addUser,

} from "../controllers/userController";


const router = express.Router();


router.post("/login", login);
router.post("/register", registerCustomer);
router.post("/create-farmer", protect, createFarmer,adminOnly,createUserByAdmin);   // can create farmer 
router.get("/", protect, adminOnly, getFarmers);
router.get("/:id", protect, adminOnly, getFarmer);
router.put("/:id", protect, adminOnly, editFarmer);
router.delete("/:id", protect, adminOnly, removeFarmer);
router.post("/crete-user", addUser); // CREATE

export default router;
