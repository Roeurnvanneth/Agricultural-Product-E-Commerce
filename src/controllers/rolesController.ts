import { Request, Response } from "express";
import { createRole} from "../service/rolesService";

// Create a role
export const createRoleController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const role = await createRole(name);
    res.status(201).json({ message: "Role created", role });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

