import express from "express";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";


const router = express.Router();

// Admin and Farmer can create/update/delete
router.post("/", protect, createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductController);
router.put("/:id", protect, updateProductController);
router.delete("/:id", protect, deleteProductController);

export default router;
