import { Schema, model, Document, Types } from "mongoose";
import { IProduct } from "../types/product.types";

export type IProductDocument = Document & IProduct;

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
    ownerId: { type: Schema.Types.ObjectId as unknown as StringConstructor, ref: "User", required: true }, // <-- type assertion
  },
  { timestamps: true }
);

export default model<IProductDocument>("Product", productSchema);
