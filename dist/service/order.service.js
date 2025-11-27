"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
// services/order.service.ts
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("../models/order.model"));
const orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
/**
 * Create order + order items in a transaction for atomicity.
 * Returns created Order populated with items.
 */
const createOrder = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // calculate total if not provided
        let total = 0;
        for (const it of payload.items) {
            total += it.price * it.quantity;
        }
        const order = await order_model_1.default.create([
            {
                farmerId: payload.farmerId,
                userId: payload.userId,
                totalAmount: total,
                status: payload.status || "pending",
            },
        ], { session });
        const orderDoc = order[0];
        const itemsToCreate = payload.items.map((it) => ({
            orderId: orderDoc._id,
            productId: it.productId,
            quantity: it.quantity,
            price: it.price,
        }));
        await orderItem_model_1.default.insertMany(itemsToCreate, { session });
        await session.commitTransaction();
        session.endSession();
        // populate items for response
        const savedOrder = await order_model_1.default.findById(orderDoc._id).lean();
        const savedItems = await orderItem_model_1.default.find({ orderId: orderDoc._id }).lean();
        return { order: savedOrder, items: savedItems };
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};
exports.createOrder = createOrder;
const getAllOrders = async () => {
    // returns orders with their items
    const orders = await order_model_1.default.find().sort({ createdAt: -1 }).lean();
    const ordersWithItems = await Promise.all(orders.map(async (o) => {
        const items = await orderItem_model_1.default.find({ orderId: o._id }).lean();
        return { ...o, items };
    }));
    return ordersWithItems;
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (id) => {
    const order = await order_model_1.default.findById(id).lean();
    if (!order)
        return null;
    const items = await orderItem_model_1.default.find({ orderId: order._id }).lean();
    return { ...order, items };
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (id, status) => {
    const updated = await order_model_1.default.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return updated;
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = async (id) => {
    // remove items first then order
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        await orderItem_model_1.default.deleteMany({ orderId: id }, { session });
        const deleted = await order_model_1.default.findByIdAndDelete(id, { session });
        await session.commitTransaction();
        session.endSession();
        return deleted;
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};
exports.deleteOrder = deleteOrder;
