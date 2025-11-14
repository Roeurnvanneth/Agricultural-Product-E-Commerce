"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://Vanneth:P%40sswOrd&Th%40tIsA!L0ng&r3c0m123@cluster0.ygt3xvk.mongodb.net/admin-farmer",
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    JWT_SECRET: process.env.JWT_SECRET || "hajassjdjeidjeijidneiudejdieidajdnanxja",
};
