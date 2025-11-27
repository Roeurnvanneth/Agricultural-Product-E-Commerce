import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    

  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  status: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
