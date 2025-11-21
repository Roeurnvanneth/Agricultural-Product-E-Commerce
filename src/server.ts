import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/user.routes";
import farmerRoutes from "./routes/user.routes";
import userRoleRoutes from "./routes/userrole.routes";
import { swaggerDocs } from "./config/swagger";
import productRoutes from "./routes/product.routes";





const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
   
    app.use("/api/auth", authRoutes);
    app.use("/api/farmers", farmerRoutes);
    app.use("/api/userroles", userRoleRoutes);
    app.use("/api/products", productRoutes);


    swaggerDocs(app);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer(); 






