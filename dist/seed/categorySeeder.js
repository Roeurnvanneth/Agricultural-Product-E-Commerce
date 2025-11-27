"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const category_model_1 = __importDefault(require("../models/category.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedCategories = async () => {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
        console.error("MONGODB_URI is not defined in environment variables.");
        return;
    }
    await mongoose_1.default.connect(dbUri);
    console.log("Connected to MongoDB");
    const categories = [
        { name: "Vanneth", description: "Vanneth category description" },
        { name: "Adidas", description: "Adidas category description" },
        { name: "Fruits", description: "Fresh fruits" },
        { name: "Vegetables", description: "Fresh vegetables" },
        { name: "Grains", description: "All kinds of grains" },
        { name: "Dairy", description: "Milk, cheese, yogurt, etc." },
        { name: "Meat", description: "Fresh meat products" },
    ];
    for (const categoryData of categories) {
        const existingCategory = await category_model_1.default.findOne({ name: categoryData.name });
        if (!existingCategory) {
            const category = new category_model_1.default(categoryData);
            await category.save();
            console.log(`Category ${categoryData.name} created.`);
        }
        else {
            console.log(`Category ${categoryData.name} already exists.`);
        }
    }
    await mongoose_1.default.disconnect();
    console.log("MongoDB disconnected");
};
seedCategories();
