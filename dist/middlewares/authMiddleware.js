"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        typeof req.headers.authorization === "string" &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
            req.role = decoded.role;
            const user = await user_model_1.default.findById(decoded.id).select("-password");
            req.user = user;
            req.role = decoded.role;
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            // attach user to request
            req.user = user;
            req.role = decoded.role;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
exports.protect = protect;
