import { Request, Response } from "express";
import * as productService from "../service/productService";
import { ICreateProduct, IUpdateProduct } from "../types/product.types";
import { AuthRequest } from "../middlewares/protect";


// Create product
export const createProductController = async (req: AuthRequest, res: Response) => {
  try {
    const body: ICreateProduct = req.body;
    const user = req.user;
    const product = await productService.createProduct(body, user);
    res.status(201).json(product);

  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};



// Get all products
export const getProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


// Get product by ID
export const getProductController = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


// Update product
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const body: IUpdateProduct = req.body;
    const product = await productService.updateProduct(req.params.id, body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete product
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
