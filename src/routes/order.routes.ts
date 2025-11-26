// routes/order.routes.ts
import { Router } from "express";
import {
  createOrderController,
  getOrdersController,
  getOrderController,
  updateOrderStatusController,
  deleteOrderController,
} from "../controllers/order.controller";
import { protect } from "../middlewares/authMiddleware";
// optional: import allowRoles if you want role-based access:
// import { Allowroles } from "../middlewares/roleMiddleware";

const router = Router();

/**
 * POST /api/orders
 * create order (buyer sends items and farmerId)
 */
router.post("/", protect, createOrderController);

/**
 * GET /api/orders
 * list orders
 */
router.get("/", protect, getOrdersController);

/**
 * GET /api/orders/:id
 * get order by id
 */
router.get("/:id", protect, getOrderController);

/**
 * PUT /api/orders/:id/status
 * update order status (admin/farmer)
 */
router.put("/:id/status", protect, updateOrderStatusController);

/**
 * DELETE /api/orders/:id
 */
router.delete("/:id", protect, deleteOrderController);

export default router;
