"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRole = void 0;
const userrole_model_1 = __importDefault(require("../models/userrole.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const mongoose_1 = require("mongoose");
// Assign role to a user
const assignRole = async (userId, roleId) => {
    const role = await role_model_1.default.findById(roleId);
    if (!role)
        throw new Error("Role not found");
    // Prevent duplicate assignment
    const exist = await userrole_model_1.default.findOne({ userId, roleId });
    if (exist)
        throw new Error("Role already assigned to this user");
    const userRole = await userrole_model_1.default.create({
        userId: new mongoose_1.Types.ObjectId(userId),
        roleId: role._id,
    });
    return userRole;
};
exports.assignRole = assignRole;
