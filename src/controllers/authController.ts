import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../service/userService";
import dotenv from "dotenv";
import { IUser } from "../models/user.model";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await findUserByEmail(email);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.roles !== "admin") return res.status(403).json({ message: "Only admin can login" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    

    // console.log("Stored password:", user.password);
    // console.log("Input password:", password);

    const token = jwt.sign({ id: user._id, role: user.roles}, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email, role: user.roles },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
