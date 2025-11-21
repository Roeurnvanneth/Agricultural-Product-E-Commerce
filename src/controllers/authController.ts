// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail, verifyPassword } from "../service/userService";
import { IUser } from "../models/user.model";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ======================= LOGIN =======================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user: IUser | null = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // generate token
    const token = jwt.sign(
      { id: user._id,},
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      status: user.status,
    };

    return res.status(200).json({
      message: `login successful`,
      token,
      user: userSafe,
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// ======================= REGISTER CUSTOMER =======================
export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    // customer fixed role
    const user = await createUser({
      name,
      email,
      password,
      phone,
      address,
      roles: "customer",
    });

    const token = jwt.sign(
      { id: user._id,},
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
  
      status: user.status,
    };

    return res.status(201).json({
      message: "Customer registered",
      token,
      user: userSafe,
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// ======================= ADMIN CREATE USER =======================
export const createUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, roles } = req.body;

    if (!roles)
      return res.status(400).json({ message: "Role is required" });

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });

    const user = await createUser({
      name,
      email,
      password,
      phone,
      address,
      roles, // admin decides role
    });

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      status: user.status,
    };

    return res.status(201).json({
      message: `User with role ${roles} created`,
      user: userSafe,
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
