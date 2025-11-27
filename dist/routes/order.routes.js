"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/order.routes.ts
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
// optional: import allowRoles if you want role-based access:
// import { Allowroles } from "../middlewares/roleMiddleware";
const router = (0, express_1.Router)();
/**
 * POST /api/orders
 * create order (buyer sends items and farmerId)
 */
router.post("/", authMiddleware_1.protect, order_controller_1.createOrderController);
/**
 * GET /api/orders
 * list orders
 */
router.get("/", authMiddleware_1.protect, order_controller_1.getOrdersController);
/**
 * GET /api/orders/:id
 * get order by id
 */
router.get("/:id", authMiddleware_1.protect, order_controller_1.getOrderController);
/**
 * PUT /api/orders/:id/status
 * update order status (admin/farmer)
 */
router.put("/:id/status", authMiddleware_1.protect, order_controller_1.updateOrderStatusController);
/**
 * DELETE /api/orders/:id
 */
router.delete("/:id", authMiddleware_1.protect, order_controller_1.deleteOrderController);
exports.default = router;
