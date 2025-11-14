import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/user.routes";
import { swaggerDocs } from "../src/config/swagger";
import farmerRoutes from "./routes/user.routes"

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/farmers", farmerRoutes);


// Swagger setup
swaggerDocs(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
