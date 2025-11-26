import express from "express";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";
import { Allowroles, } from "../middlewares/roleMiddleware";

const router = express.Router();

// Admin and Farmer can create/update/delete
router.post("/", protect, Allowroles("admin", "farmer"), createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductController);
router.put("/:id", protect, Allowroles("admin", "farmer"), updateProductController);
router.delete("/:id", protect, Allowroles("admin", "farmer"), deleteProductController);

export default router;
