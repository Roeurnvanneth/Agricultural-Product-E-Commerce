import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserRole extends Document {
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

const userRoleSchema = new Schema<IUserRole>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserRole>("UserRole", userRoleSchema);
