"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // login stays here
const userController_1 = require("../controllers/userController"); // correct controller
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminOnly_1 = require("../middlewares/adminOnly");
const userController_2 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/login", authController_1.login);
router.post("/register", authController_1.registerCustomer);
router.post("/create-farmer", authMiddleware_1.protect, userController_1.createFarmer, adminOnly_1.adminOnly, authController_1.createUserByAdmin); // can create farmer 
router.get("/", authMiddleware_1.protect, adminOnly_1.adminOnly, userController_2.getFarmers);
router.get("/:id", authMiddleware_1.protect, adminOnly_1.adminOnly, userController_2.getFarmer);
router.put("/:id", authMiddleware_1.protect, adminOnly_1.adminOnly, userController_2.editFarmer);
router.delete("/:id", authMiddleware_1.protect, adminOnly_1.adminOnly, userController_2.removeFarmer);
router.post("/create-user", userController_2.addUser); // CREATE
exports.default = router;
