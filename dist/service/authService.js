"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET || "change_me";
// ✅ Register new customer
const registerService = async (userData) => {
    const existingUser = await user_model_1.default.findOne({ email: userData.email });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
    const newUser = await user_model_1.default.create({
        ...userData,
        password: hashedPassword,
    });
    return newUser;
};
exports.registerService = registerService;
// ✅ Login user and return JWT
const loginService = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, }, jwtSecret, { expiresIn: "1d" });
    return { token, user };
};
exports.loginService = loginService;
