"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRolesController = void 0;
const userroleService_1 = require("../service/userroleService");
// Assign role to a user
const assignRolesController = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        if (!userId || !roleId) {
            return res.status(400).json({ message: "userId and roleId are required" });
        }
        const assigned = await (0, userroleService_1.assignRole)(userId, roleId);
        res.status(201).json({
            message: "Role assigned successfully",
            data: assigned,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.assignRolesController = assignRolesController;
