import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
