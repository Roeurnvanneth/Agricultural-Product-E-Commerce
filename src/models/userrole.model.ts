// src/models/userrole.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";
import { IRole } from "./role.model";

export interface IUserRole extends Document {
  userId: Types.ObjectId | IUser;
  rolesId: Types.ObjectId | IRole;
}

const userRoleSchema = new Schema<IUserRole>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rolesId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserRole>("UserRole", userRoleSchema);
