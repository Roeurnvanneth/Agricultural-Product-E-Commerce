import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model";
import Role from "../models/role.model";
import UserRole from "../models/userrole.model";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin-farmer";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "vanneth@gmail.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("vanneth123456", 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Vanneth",
      email: "vanneth@gmail.com",
      password: hashedPassword,
      phone: "0123456789",
      address: "Phnom Penh",
      status: "active",
    });

    // Create admin role if it doesn't exist
    let adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) adminRole = await Role.create({ name: "admin" });

    // Assign admin role to user
    await UserRole.create({ user: adminUser._id, role: adminRole._id });

    console.log("🎉 Admin created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
