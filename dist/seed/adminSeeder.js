"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSeeder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const userrole_model_1 = __importDefault(require("../models/userrole.model"));
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";
const adminSeeder = async () => {
    try {
        if (mongoose_1.default.connection.readyState === 0) {
            await mongoose_1.default.connect(MONGO_URI);
            //   console.log("Connected to MongoDB for seeding");
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail)
            throw new Error("ADMIN_EMAIL is missing in .env");
        const existingAdmin = await user_model_1.default.findOne({ email: adminEmail });
        if (existingAdmin) {
            //   console.log("Admin user already exists:", adminEmail);
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD || "admin@12345", 10);
        const adminUser = new user_model_1.default({
            name: `${process.env.ADMIN_FIRST_NAME || "Super"} ${process.env.ADMIN_LAST_NAME || "Admin"}`,
            email: adminEmail,
            password: passwordHash,
            phone: "0000000000",
            address: "Phnom Penh", // required field
            status: "active",
        });
        const newAdmin = await adminUser.save();
        // console.log("Admin user created with id:", newAdmin._id);
        let adminRole = await role_model_1.default.findOne({ name: "admin" });
        if (!adminRole) {
            //   console.log("Admin role not found, creating one.");
            adminRole = await role_model_1.default.create({ name: "admin", description: "Administrator role" });
        }
        await userrole_model_1.default.create({ userId: newAdmin._id, roleId: adminRole._id });
        // console.log("Admin role assigned successfully");
    }
    catch (error) {
        console.error("Error creating admin user:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
exports.adminSeeder = adminSeeder;
(0, exports.adminSeeder)();
