import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import taskRoutes from './routes/taskRoutes';
import { INTERNAL_SERVICE_ERROR } from './constants/errors';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.message);
  res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: INTERNAL_SERVICE_ERROR });
});

export default app;
