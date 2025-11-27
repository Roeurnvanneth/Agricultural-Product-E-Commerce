import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://Vanneth:P%40sswOrd&Th%40tIsA!L0ng&r3c0m123@cluster0.ygt3xvk.mongodb.net/admin-farmer",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_SECRET: process.env.JWT_SECRET || "hajassjdjeidjeijidneiudejdieidajdnanxja",

};



