"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.removeFarmer = exports.editFarmer = exports.createFarmer = exports.getFarmer = exports.getFarmers = void 0;
const userService_1 = require("../service/userService");
const userService_2 = require("../service/userService");
// GET ALL FARMERS
const getFarmers = async (_, res) => {
    try {
        const farmers = await (0, userService_2.getAllFarmers)();
        res.json(farmers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFarmers = getFarmers;
// GET FARMER BY ID
const getFarmer = async (req, res) => {
    try {
        const farmer = await (0, userService_2.getFarmerById)(req.params.id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.json(farmer);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFarmer = getFarmer;
// CREATE FARMER
const createFarmer = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }
        const farmer = await (0, userService_1.createUser)({
            name,
            email,
            password,
            phone,
            address,
            roles: "farmer",
            status: "active",
        });
        res.status(201).json({ message: "Farmer created successfully", farmer });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: error.message });
    }
};
exports.createFarmer = createFarmer;
// UPDATE FARMER
const editFarmer = async (req, res) => {
    try {
        const farmer = await (0, userService_2.updateFarmer)(req.params.id, req.body);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.json({ message: "Farmer updated successfully", farmer });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.editFarmer = editFarmer;
// DELETE FARMER
const removeFarmer = async (req, res) => {
    try {
        const farmer = await (0, userService_2.deleteFarmer)(req.params.id);
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.json({ message: "Farmer deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeFarmer = removeFarmer;
// CREATE USER
const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, password",
            });
        }
        const user = await (0, userService_1.createUser)(req.body);
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        if (error.code === 11000)
            return res.status(400).json({ message: "Email already exists" });
        res.status(500).json({ message: error.message });
    }
};
exports.addUser = addUser;
