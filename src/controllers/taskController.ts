import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from '../services/taskService';
import { ITask } from '../models/taskModel';
import {
  ERROR_FETCHING_TASKS,
  ERROR_CREATING_TASK,
  ERROR_DELETING_TASKS,
  ERROR_UPDATING_TASK,
  TASK_NOT_FOUND,
  ERROR_ID_REQUIRED,
  ERROR_FETCHING_TASK_BY_ID,
} from '@/constants/errors';

const taskService = new TaskService();

// GET all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("eNTRO AL METODO");
    const tasks = await taskService.getAllTasks();
    console.log("tasks", tasks);
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_FETCHING_TASKS });
  }
};

// GET task by id
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_GATEWAY).json(ERROR_ID_REQUIRED);
      return;
    }
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json({ message: TASK_NOT_FOUND });
      return;
    }
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_FETCHING_TASK_BY_ID });
  }
};

// POST create task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, userId } = req.body;
    const newTask: ITask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const createdTask = await taskService.createTask(newTask);
    res.status(StatusCodes.CREATED).json(createdTask);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_CREATING_TASK });
  }
};

// PUT update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, isCompleted, userId, createdAt } = req.body;
    const updatedTask: ITask = {
        id: req.params.id,
        title,
        description,
        isCompleted,
        userId,  // Placeholder for userId update logic
        createdAt,
        updatedAt: new Date().toISOString(),
    };

    const result = await taskService.updateTask(req.params.id, updatedTask);
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ message: TASK_NOT_FOUND });
    } else {
      res.status(StatusCodes.OK).json(result);
    }
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_UPDATING_TASK });
  }
};

// DELETE task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_GATEWAY).json(ERROR_ID_REQUIRED);
      return;
    }
    const result = await taskService.deleteTask(req.params.id);
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ message: TASK_NOT_FOUND });
    } else {
      res.status(StatusCodes.OK).json({ message: 'Task deleted' });
    }
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_DELETING_TASKS });
  }
};
