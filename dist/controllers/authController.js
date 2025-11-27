"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserByAdmin = exports.registerCustomer = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userService_1 = require("../service/userService");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// ======================= LOGIN =======================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password are required" });
        const user = await (0, userService_1.findUserByEmail)(email);
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await (0, userService_1.verifyPassword)(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        // generate token
        const token = jsonwebtoken_1.default.sign({ id: user._id, }, JWT_SECRET, { expiresIn: "1d" });
        const userSafe = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            status: user.status,
        };
        return res.status(200).json({
            message: `login successful`,
            token,
            user: userSafe,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.login = login;
// ======================= REGISTER CUSTOMER =======================
const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address)
            return res.status(400).json({ message: "All fields are required" });
        const existingUser = await (0, userService_1.findUserByEmail)(email);
        if (existingUser)
            return res.status(409).json({ message: "Email already exists" });
        // customer fixed role
        const user = await (0, userService_1.createUser)({
            name,
            email,
            password,
            phone,
            address,
            roles: "customer",
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, }, JWT_SECRET, { expiresIn: "1d" });
        const userSafe = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            status: user.status,
        };
        return res.status(201).json({
            message: "Customer registered",
            token,
            user: userSafe,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.registerCustomer = registerCustomer;
// ======================= ADMIN CREATE USER =======================
const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, phone, address, roles } = req.body;
        if (!roles)
            return res.status(400).json({ message: "Role is required" });
        const existingUser = await (0, userService_1.findUserByEmail)(email);
        if (existingUser)
            return res.status(409).json({ message: "Email already exists" });
        const user = await (0, userService_1.createUser)({
            name,
            email,
            password,
            phone,
            address,
            roles, // admin decides role
        });
        const userSafe = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            status: user.status,
        };
        return res.status(201).json({
            message: `User with role ${roles} created`,
            user: userSafe,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createUserByAdmin = createUserByAdmin;
