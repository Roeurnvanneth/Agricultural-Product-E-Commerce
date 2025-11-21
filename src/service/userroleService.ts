import UserRole from "../models/userrole.model";
import Role from "../models/role.model";
import { Types } from "mongoose";

// Assign role to a user
export const assignRole = async (userId: string, roleId: string) => {
  const role = await Role.findById(roleId);
  if (!role) throw new Error("Role not found");

  // Prevent duplicate assignment
  const exist = await UserRole.findOne({ userId, roleId });
  if (exist) throw new Error("Role already assigned to this user");

  const userRole = await UserRole.create({
    userId: new Types.ObjectId(userId),
    roleId: role._id,
  });

  return userRole;
};

