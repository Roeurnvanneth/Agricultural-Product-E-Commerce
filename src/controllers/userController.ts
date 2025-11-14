import { Request, Response } from "express";
import { createUser } from "../service/userService";

export const createFarmer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const farmer = await createUser({
      name,
      email,
      password,
      phone,
      address,
      roles: "farmer",
      status: "active",
    });

    res.status(201).json({ message: "Farmer created successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

