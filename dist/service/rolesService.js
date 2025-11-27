"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = void 0;
const role_model_1 = __importDefault(require("../models/role.model"));
// Create a role
const createRole = async (name) => {
    const exist = await role_model_1.default.findOne({ name });
    if (exist)
        throw new Error("Role already exists");
    const role = await role_model_1.default.create({ name });
    return role;
};
exports.createRole = createRole;
