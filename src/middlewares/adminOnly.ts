import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/protect";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.roles !== "admin") {
    return res.status(403).json({ message: "Admin only access denied" });
  }
  next();
};
