import { Request, Response } from "express";
import { assignRole} from "../service/userroleService";

// Assign role to a user
export const assignRolesController = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      return res.status(400).json({ message: "userId and roleId are required" });
    }

    const assigned = await assignRole(userId, roleId);

    res.status(201).json({
      message: "Role assigned successfully",
      data: assigned,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};