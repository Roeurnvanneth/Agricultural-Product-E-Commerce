import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import UserRole from "../models/userrole.model";
import Role from "../models/role.model";

export const Allowroles = (...allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user._id;

      // 1️⃣ Find all user_roles by userId
      const userRoles = await UserRole.find({ userId });

      if (userRoles.length === 0) {
        return res.status(403).json({ message: "No roles assigned to this user" });
      }

      // 2️⃣ Extract role IDs
      const roleIds = userRoles.map((ur) => ur.roleId);

      // 3️⃣ Load roles from Role table
      const roles = await Role.find({ _id: { $in: roleIds } });

      const roleNames = roles.map((r) => r.name);

      console.log("User roles:", roleNames);

      // 4️⃣ Check if user has at least ONE allowed role
      const hasPermission = roleNames.some((role) =>
        allowedRoles.includes(role)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      // allowed → continue
      next();
    } catch (error) {
      res.status(500).json({ message: "Role authorization error", error });
    }
  };
};
