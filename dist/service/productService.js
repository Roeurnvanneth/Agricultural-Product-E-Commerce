"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Create product
const createProduct = async (data, user) => {
    const product = new product_model_1.default(data);
    const saved = await product.save();
    return {
        ...saved.toObject(),
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
    };
};
exports.createProduct = createProduct;
// Get all products
const getAllProducts = async () => {
    const products = await product_model_1.default.find().lean();
    return products.map(p => ({
        ...p,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    }));
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (id) => {
    const product = await product_model_1.default.findById(id).lean();
    if (!product)
        return null;
    return { ...product, createdAt: product.createdAt, updatedAt: product.updatedAt };
};
exports.getProductById = getProductById;
// Update product
const updateProduct = async (id, data) => {
    const product = await product_model_1.default.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!product)
        return null;
    return { ...product, createdAt: product.createdAt, updatedAt: product.updatedAt };
};
exports.updateProduct = updateProduct;
// Delete product
const deleteProduct = async (id) => {
    const product = await product_model_1.default.findByIdAndDelete(id).lean();
    if (!product)
        return null;
    return { ...product, createdAt: product.createdAt, updatedAt: product.updatedAt };
};
exports.deleteProduct = deleteProduct;
