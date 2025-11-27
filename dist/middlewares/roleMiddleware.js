"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allowroles = void 0;
const userrole_model_1 = __importDefault(require("../models/userrole.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const Allowroles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const userId = req.user._id;
            // 1️⃣ Find all user_roles by userId
            const userRoles = await userrole_model_1.default.find({ userId });
            if (userRoles.length === 0) {
                return res.status(403).json({ message: "No roles assigned to this user" });
            }
            // 2️⃣ Extract role IDs
            const roleIds = userRoles.map((ur) => ur.roleId);
            // 3️⃣ Load roles from Role table
            const roles = await role_model_1.default.find({ _id: { $in: roleIds } });
            const roleNames = roles.map((r) => r.name);
            console.log("User roles:", roleNames);
            // 4️⃣ Check if user has at least ONE allowed role
            const hasPermission = roleNames.some((role) => allowedRoles.includes(role));
            if (!hasPermission) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }
            // allowed → continue
            next();
        }
        catch (error) {
            res.status(500).json({ message: "Role authorization error", error });
        }
    };
};
exports.Allowroles = Allowroles;
