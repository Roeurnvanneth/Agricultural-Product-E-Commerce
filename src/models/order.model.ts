// models/order.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  farmerId: mongoose.Types.ObjectId; // who sells (farmer)
  userId?: mongoose.Types.ObjectId;  // who buys (optional)
  totalAmount: number;
  status: string; 
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true }, // no enum
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
