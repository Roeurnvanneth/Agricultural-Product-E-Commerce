import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model";
import Role from "../models/role.model";
import UserRole from "../models/userrole.model";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

export const adminSeeder = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
    //   console.log("Connected to MongoDB for seeding");
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) throw new Error("ADMIN_EMAIL is missing in .env");

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
    //   console.log("Admin user already exists:", adminEmail);
      return;
    }

    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin@12345", 10);

    const adminUser = new User({
      name: `${process.env.ADMIN_FIRST_NAME || "Super"} ${process.env.ADMIN_LAST_NAME || "Admin"}`,
      email: adminEmail,
      password: passwordHash,
      phone: "0000000000",
      address: "Phnom Penh", // required field
      status: "active",
    });

    const newAdmin = await adminUser.save();
    // console.log("Admin user created with id:", newAdmin._id);

    let adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
    //   console.log("Admin role not found, creating one.");
      adminRole = await Role.create({ name: "admin", description: "Administrator role" });
    }

    await UserRole.create({ userId: newAdmin._id, roleId: adminRole._id });
    // console.log("Admin role assigned successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
};
adminSeeder();