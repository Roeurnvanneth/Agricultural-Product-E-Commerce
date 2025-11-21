import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRole extends Document {
  name: string;
  userId?: Types.ObjectId; // optional if you want to assign directly to a user
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }, // optional
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", roleSchema);
