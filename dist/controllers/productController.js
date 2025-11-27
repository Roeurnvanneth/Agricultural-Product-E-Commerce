"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.getProductController = exports.getProductsController = exports.createProductController = void 0;
const productService = __importStar(require("../service/productService"));
// Create product
const createProductController = async (req, res) => {
    try {
        const body = req.body;
        const user = req.user;
        const product = await productService.createProduct(body, user);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createProductController = createProductController;
// Get all products
const getProductsController = async (_req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProductsController = getProductsController;
// Get product by ID
const getProductController = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProductController = getProductController;
// Update product
const updateProductController = async (req, res) => {
    try {
        const body = req.body;
        const product = await productService.updateProduct(req.params.id, body);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProductController = updateProductController;
// Delete product
const deleteProductController = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProductController = deleteProductController;
