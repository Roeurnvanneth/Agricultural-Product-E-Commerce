"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Admin and Farmer can create/update/delete
router.post("/", authMiddleware_1.protect, (0, roleMiddleware_1.Allowroles)("admin", "farmer"), productController_1.createProductController);
router.get("/", productController_1.getProductsController);
router.get("/:id", productController_1.getProductController);
router.put("/:id", authMiddleware_1.protect, (0, roleMiddleware_1.Allowroles)("admin", "farmer"), productController_1.updateProductController);
router.delete("/:id", authMiddleware_1.protect, (0, roleMiddleware_1.Allowroles)("admin", "farmer"), productController_1.deleteProductController);
exports.default = router;
