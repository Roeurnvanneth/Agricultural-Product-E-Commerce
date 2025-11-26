import Product from "../models/product.model";
import { ICreateProduct, IUpdateProduct, IProductResponse } from "../types/product.types";

// Create product
export const createProduct = async (data: ICreateProduct, user: any): Promise<IProductResponse> => {
  const product = new Product(data);
  const saved = await product.save();
  return {
    ...saved.toObject(),
    createdAt: saved.createdAt!,
    updatedAt: saved.updatedAt!,
  };
};

// Get all products
export const getAllProducts = async (): Promise<IProductResponse[]> => {
  const products = await Product.find().lean();
  return products.map(p => ({
    ...p,
    createdAt: p.createdAt!,
    updatedAt: p.updatedAt!,
  }));
};

// Get product by ID
export const getProductById = async (id: string): Promise<IProductResponse | null> => {
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return { ...product, createdAt: product.createdAt!, updatedAt: product.updatedAt! };
};

// Update product
export const updateProduct = async (id: string, data: IUpdateProduct): Promise<IProductResponse | null> => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!product) return null;
  return { ...product, createdAt: product.createdAt!, updatedAt: product.updatedAt! };
};

// Delete product
export const deleteProduct = async (id: string): Promise<IProductResponse | null> => {
  const product = await Product.findByIdAndDelete(id).lean();
  if (!product) return null;
  return { ...product, createdAt: product.createdAt!, updatedAt: product.updatedAt! };
};
