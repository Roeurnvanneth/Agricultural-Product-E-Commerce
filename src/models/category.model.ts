import { Document, Schema, Types, model } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
}
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, reqired: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
export default model<ICategory>("Category", categorySchema);