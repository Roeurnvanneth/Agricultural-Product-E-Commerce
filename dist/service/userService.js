"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = async (data) => {
    const existing = await user_model_1.default.findOne({ email: data.email });
    if (existing)
        throw new Error("User already exists");
    const user = await user_model_1.default.create(data);
    return user;
};
exports.createUser = createUser;
// find user by email 
const findUserByEmail = async (email) => {
    return await user_model_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
