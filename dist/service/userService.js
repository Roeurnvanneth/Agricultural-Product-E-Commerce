"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFarmers = exports.countFarmers = exports.deleteFarmer = exports.updateFarmer = exports.getFarmerById = exports.getAllFarmers = exports.changeUserStatus = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.verifyPassword = exports.findUserByEmail = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// -------------------- USER CRUD --------------------
// CREATE USER
const createUser = async (data) => {
    // Check if user already exists
    const existingUser = await user_model_1.default.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    // Create user
    const user = await user_model_1.default.create({
        ...data,
        password: hashedPassword,
        status: data.status || "active",
    });
    // Remove password before returning
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
exports.createUser = createUser;
// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
    return await user_model_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
// VERIFY PASSWORD
const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt_1.default.compare(plainPassword, hashedPassword);
};
exports.verifyPassword = verifyPassword;
// GET ALL USERS
const getAllUsers = async () => {
    return await user_model_1.default.find().select("-password");
};
exports.getAllUsers = getAllUsers;
// GET USER BY ID
const getUserById = async (id) => {
    const user = await user_model_1.default.findById(id).select("-password");
    return user;
};
exports.getUserById = getUserById;
// UPDATE USER
const updateUser = async (id, data) => {
    const updateData = { ...data };
    if (updateData.password) {
        updateData.password = await bcrypt_1.default.hash(updateData.password, 10);
    }
    const user = await user_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
    return user;
};
exports.updateUser = updateUser;
// DELETE USER
const deleteUser = async (id) => {
    return await user_model_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
// CHANGE USER STATUS
const changeUserStatus = async (id, status) => {
    return await user_model_1.default.findByIdAndUpdate(id, { status }, { new: true }).select("-password");
};
exports.changeUserStatus = changeUserStatus;
// -------------------- FARMER-SPECIFIC --------------------
// GET ALL FARMERS
const getAllFarmers = async () => {
    return await user_model_1.default.find({ roles: "farmer" }).select("-password");
};
exports.getAllFarmers = getAllFarmers;
// GET FARMER BY ID
const getFarmerById = async (id) => {
    return await user_model_1.default.findOne({ _id: id, roles: "farmer" }).select("-password");
};
exports.getFarmerById = getFarmerById;
// UPDATE FARMER
const updateFarmer = async (id, data) => {
    const updateData = { ...data };
    if (updateData.password) {
        updateData.password = await bcrypt_1.default.hash(updateData.password, 10);
    }
    return await user_model_1.default.findOneAndUpdate({ _id: id, roles: "farmer" }, updateData, { new: true, runValidators: true }).select("-password");
};
exports.updateFarmer = updateFarmer;
// DELETE FARMER
const deleteFarmer = async (id) => {
    return await user_model_1.default.findOneAndDelete({ _id: id, roles: "farmer" });
};
exports.deleteFarmer = deleteFarmer;
// COUNT FARMERS
const countFarmers = async () => {
    return await user_model_1.default.countDocuments({ roles: "farmer" });
};
exports.countFarmers = countFarmers;
// SEARCH FARMERS
const searchFarmers = async (searchTerm) => {
    return await user_model_1.default.find({
        roles: "farmer",
        $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { phone: { $regex: searchTerm, $options: "i" } },
        ],
    }).select("-password");
};
exports.searchFarmers = searchFarmers;
