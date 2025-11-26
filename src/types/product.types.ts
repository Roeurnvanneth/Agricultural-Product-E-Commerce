// Product TypeScript types

export interface IProduct {
  _id?: string;         // optional because MongoDB adds it
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  ownerId: string;       // reference to User
  createdAt?: Date;
  updatedAt?: Date;
}


// Request body for creating a product
export interface ICreateProduct {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  ownerId?: string;
}


// Request body for updating a product
export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  ownerId?: string;
}

// Response type
export interface IProductResponse {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  ownerId: string | import("mongoose").Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Multiple products
export type IProductsResponse = IProductResponse[];
