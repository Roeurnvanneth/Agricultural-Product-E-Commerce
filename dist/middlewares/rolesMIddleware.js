"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permit = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userrole_model_1 = __importDefault(require("../models/userrole.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
/**
 * Authenticate middleware: validates JWT and sets req.user.userId
 */
const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token' });
    }
    const token = auth.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = { userId: payload.userId };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
/**
 * Permit middleware: dynamically check roles in DB
 * @param allowedRoles Array of allowed role names
 */
const permit = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!req.user?.userId) {
                return res.status(401).json({ message: 'Unauthorized: No userId' });
            }
            const userId = req.user.userId;
            // 1️⃣ Find all roles assigned to this user
            const userRoles = await userrole_model_1.default.find({ userId });
            if (!userRoles.length) {
                return res.status(403).json({ message: 'No roles assigned to this user' });
            }
            // 2️⃣ Extract role IDs
            const roleIds = userRoles.map((ur) => ur.roleId);
            // 3️⃣ Load role names from Role collection
            const roles = await role_model_1.default.find({ _id: { $in: roleIds } });
            const roleNames = roles.map((r) => r.name);
            // 4️⃣ Check if user has at least ONE allowed role
            const hasPermission = roleNames.some((role) => allowedRoles.includes(role));
            if (!hasPermission) {
                return res.status(403).json({ message: 'Forbidden: Access denied' });
            }
            // allowed → continue
            next();
        }
        catch (error) {
            console.error('Permit middleware error:', error);
            res.status(500).json({ message: 'Role authorization error', error });
        }
    };
};
exports.permit = permit;
