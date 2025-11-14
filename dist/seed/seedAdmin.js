"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin-farmer");
        const existing = await user_model_1.default.findOne({ email: "vanneth@gmail.com" });
        if (existing) {
            console.log("✅ Admin already exists"); // so admin ready success
            process.exit(0);
        }
        const hashedPassword = await bcryptjs_1.default.hash("vanneth123456", 10); // can succes only this password
        // only this admin can login with this email
        await user_model_1.default.create({
            name: "Vanneth",
            email: "vanneth@gmail.com",
            password: hashedPassword, // hashedPassword done
            roles: "admin",
            phone: "0123456789",
            address: "Phnom Penh",
            status: "active",
        });
        console.log("🎉 Admin created successfully!"); // console.log this can create 
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
seedAdmin();
