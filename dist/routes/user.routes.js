"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // login stays here
const userController_1 = require("../controllers/userController"); // correct controller
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/login", authController_1.login);
router.post("/create-farmer", authMiddleware_1.protect, userController_1.createFarmer); // can create farmer 
exports.default = router;
