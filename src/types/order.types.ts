// types/order.types.ts
import mongoose from "mongoose";

export interface ICreateOrderItem {
  productId: string | mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateOrder {
  farmerId: string | mongoose.Types.ObjectId;
  userId?: string | mongoose.Types.ObjectId; // buyer — optional
  items: ICreateOrderItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string; // default "pending"
}



