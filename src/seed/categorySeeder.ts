import mongoose from "mongoose";
import Category from "../models/category.model";
import dotenv from "dotenv";

dotenv.config();

const seedCategories = async () => {
  const dbUri = process.env.MONGO_URI;
  if (!dbUri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    return;
  }

  await mongoose.connect(dbUri);
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
    const existingCategory = await Category.findOne({ name: categoryData.name });
    if (!existingCategory) {
      const category = new Category(categoryData);
      await category.save();
      console.log(`Category ${categoryData.name} created.`);
    } else {
      console.log(`Category ${categoryData.name} already exists.`);
    }
  }

  await mongoose.disconnect();
  console.log("MongoDB disconnected");
};

seedCategories();
