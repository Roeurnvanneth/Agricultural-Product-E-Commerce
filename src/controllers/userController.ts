import { Request, Response } from "express";
import { createUser } from "../service/userService";

import {
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
} from "../service/userService";

// GET ALL FARMERS
export const getFarmers = async (_: Request, res: Response) => {
  try {
    const farmers = await getAllFarmers();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// GET FARMER BY ID
export const getFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await getFarmerById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// CREATE FARMER
export const createFarmer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Name, email, and password are required" 
      });
    }

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
    if ((error as any).code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: (error as Error).message });
  }
};

// UPDATE FARMER
export const editFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await updateFarmer(req.params.id, req.body);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json({ message: "Farmer updated successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// DELETE FARMER
export const removeFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await deleteFarmer(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json({ message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// CREATE USER
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, password",
      });
    }
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    if (error.code === 11000)
      return res.status(400).json({ message: "Email already exists" });

    res.status(500).json({ message: error.message });
  }
};