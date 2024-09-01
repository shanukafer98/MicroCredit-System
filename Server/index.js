import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import clientRouter from "./routes/client.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 seconds
        connectTimeoutMS: 10000, // 10 seconds
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("MongoDB connected");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Basic route for server status
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Use routers for API routes
app.use("/api/client", clientRouter);
app.use("/api/auth", authRouter);

