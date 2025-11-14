import mongoose from "mongoose";
import { environment } from "../config/environment";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(environment.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
