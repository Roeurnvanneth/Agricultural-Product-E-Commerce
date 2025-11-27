"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userrole_controller_1 = require("../controllers/userrole.controller");
const rolesController_1 = require("../controllers/rolesController");
const router = express_1.default.Router();
router.post("/create", rolesController_1.createRoleController); // create role
router.post("/assign", userrole_controller_1.assignRolesController); // assign role to user
exports.default = router;
