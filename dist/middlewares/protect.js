"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : null;
        if (!token)
            return res.status(401).json({ message: "Not authorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = await user_model_1.default.findById(decoded.id).select("-password");
        req.role = decoded.role;
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.protect = protect;
