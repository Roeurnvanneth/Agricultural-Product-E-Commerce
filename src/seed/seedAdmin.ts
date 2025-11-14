import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin-farmer");

    const existing = await User.findOne({ email: "vanneth@gmail.com" });
    if (existing) {
      console.log("✅ Admin already exists");    // so admin ready success
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("vanneth123456", 10); // can succes only this password
  // only this admin can login with this email
    await User.create({
      name: "Vanneth",
      email: "vanneth@gmail.com",
      password: hashedPassword, // hashedPassword done
      roles: "admin",  
      phone: "0123456789",
      address: "Phnom Penh",
      status: "active",
    });
    console.log("🎉 Admin created successfully!");  // console.log this can create 
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
