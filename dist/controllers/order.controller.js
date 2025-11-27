"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderStatusController = exports.getOrderController = exports.getOrdersController = exports.createOrderController = void 0;
const order_service_1 = require("../service/order.service");
const createOrderController = async (req, res) => {
    try {
        const body = req.body;
        // Optionally set userId from token (buyer)
        if (!body.userId && req.user)
            body.userId = req.user._id;
        const result = await (0, order_service_1.createOrder)(body);
        return res.status(201).json({ message: "Order created", data: result });
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
exports.createOrderController = createOrderController;
const getOrdersController = async (_req, res) => {
    try {
        const orders = await (0, order_service_1.getAllOrders)();
        return res.json(orders);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getOrdersController = getOrdersController;
const getOrderController = async (req, res) => {
    try {
        const order = await (0, order_service_1.getOrderById)(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        return res.json(order);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getOrderController = getOrderController;
const updateOrderStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status)
            return res.status(400).json({ message: "status is required" });
        const updated = await (0, order_service_1.updateOrderStatus)(req.params.id, status);
        if (!updated)
            return res.status(404).json({ message: "Order not found" });
        return res.json({ message: "Order updated", order: updated });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
const deleteOrderController = async (req, res) => {
    try {
        const deleted = await (0, order_service_1.deleteOrder)(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Order not found" });
        return res.json({ message: "Order deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.deleteOrderController = deleteOrderController;
