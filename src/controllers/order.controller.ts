// controllers/order.controller.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../service/order.service";
import { ICreateOrder } from "../types/order.types";

export const createOrderController = async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body as ICreateOrder;

    // Optionally set userId from token (buyer)
    if (!body.userId && req.user) body.userId = req.user._id;

    const result = await createOrder(body);
    return res.status(201).json({ message: "Order created", data: result });
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const getOrdersController = async (_req: AuthRequest, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

export const getOrderController = async (req: AuthRequest, res: Response) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

export const updateOrderStatusController = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "status is required" });

    const updated = await updateOrderStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: "Order not found" });
    return res.json({ message: "Order updated", order: updated });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteOrderController = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await deleteOrder(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    return res.json({ message: "Order deleted" });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

