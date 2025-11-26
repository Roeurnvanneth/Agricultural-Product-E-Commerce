// services/order.service.ts
import mongoose from "mongoose";
import Order, { IOrder } from "../models/order.model";
import OrderItem, { IOrderItem } from "../models/orderItem.model";
import { ICreateOrder, ICreateOrderItem } from "../types/order.types";

/**
 * Create order + order items in a transaction for atomicity.
 * Returns created Order populated with items.
 */
export const createOrder = async (payload: ICreateOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // calculate total if not provided
    let total = 0;
    for (const it of payload.items) {
      total += it.price * it.quantity;
    }

    const order = await Order.create(
      [
        {
          farmerId: payload.farmerId,
          userId: payload.userId,
          totalAmount: total,
          status: payload.status || "pending",
        },
      ],
      { session }
    );

    const orderDoc = order[0];

    const itemsToCreate = payload.items.map((it: ICreateOrderItem) => ({
      orderId: orderDoc._id,
      productId: it.productId,
      quantity: it.quantity,
      price: it.price,
    }));

    await OrderItem.insertMany(itemsToCreate, { session });

    await session.commitTransaction();
    session.endSession();

    // populate items for response
    const savedOrder = await Order.findById(orderDoc._id).lean();
    const savedItems = await OrderItem.find({ orderId: orderDoc._id }).lean();

    return { order: savedOrder, items: savedItems };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const getAllOrders = async () => {
  // returns orders with their items
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const ordersWithItems = await Promise.all(
    orders.map(async (o) => {
      const items = await OrderItem.find({ orderId: o._id }).lean();
      return { ...o, items };
    })
  );
  return ordersWithItems;
};

export const getOrderById = async (id: string) => {
  const order = await Order.findById(id).lean();
  if (!order) return null;
  const items = await OrderItem.find({ orderId: order._id }).lean();
  return { ...order, items };
};

export const updateOrderStatus = async (id: string, status: string) => {
  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();
  return updated;
};

export const deleteOrder = async (id: string) => {
  // remove items first then order
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await OrderItem.deleteMany({ orderId: id }, { session });
    const deleted = await Order.findByIdAndDelete(id, { session });
    await session.commitTransaction();
    session.endSession();
    return deleted;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

