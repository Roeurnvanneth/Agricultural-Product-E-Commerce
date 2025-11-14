"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../service/userService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, userService_1.findUserByEmail)(email);
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        if (user.roles !== "admin")
            return res.status(403).json({ message: "Only admin can login" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        console.log("Stored password:", user.password);
        console.log("Input password:", password);
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.roles }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });
        res.status(200).json({
            token,
            user: { name: user.name, email: user.email, role: user.roles },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.login = login;
