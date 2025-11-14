"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFarmer = void 0;
const userService_1 = require("../service/userService");
const createFarmer = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
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
        res.status(500).json({ message: error.message });
    }
};
exports.createFarmer = createFarmer;
