"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoleController = void 0;
const rolesService_1 = require("../service/rolesService");
// Create a role
const createRoleController = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await (0, rolesService_1.createRole)(name);
        res.status(201).json({ message: "Role created", role });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createRoleController = createRoleController;
