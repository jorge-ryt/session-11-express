import express, { Request, Response, Express } from "express";
import { StatusCodes } from "http-status-codes";
import taskRoutes from "@/routes/taskRoutes";
import userRoutes from "@/routes/userRoutes"
import { INTERNAL_SERVICE_ERROR } from "@/constants/errors";
import connectDB from "./data/db";

const app: Express = express();

// Connect to mongo
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.message);
  res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: INTERNAL_SERVICE_ERROR });
});

export default app;
