import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";

import authRoutes from "./routes/auth.js";
import problemRoutes from "./routes/problems.js";



dotenv.config();

const startServer = async () => {
  try {
    // Await database connection
    await connectDB();
    console.log("Database connected, starting server...");

    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173', // frontend URL
        methods: ['GET','POST','PUT','DELETE'], // allowed methods
        credentials: true // if you use cookies or auth headers
    }));
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes); // to sign in 
    app.use("/api/problems", problemRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

// Start everything
startServer();