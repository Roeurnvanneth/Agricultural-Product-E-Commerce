// models/orderItem.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem extends Document {
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number; // price per item at time of order
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderItem>("OrderItem", orderItemSchema);
