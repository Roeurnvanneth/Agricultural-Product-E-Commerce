import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface JwtPayload {
  id: string;
  role: string;
}
export interface AuthRequest extends Request {
  user?: any;
  role?: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;


  if (
    req.headers.authorization &&
    typeof req.headers.authorization === "string" &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;

      req.role = decoded.role;  
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      req.role = decoded.role;  


      if (!user) {
        return res.status(401).json({ message: "User not found" });

      }
      // attach user to request
      (req as any).user = user;
      (req as any).role = decoded.role;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
