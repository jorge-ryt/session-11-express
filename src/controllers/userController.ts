import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/userService';
import { IUser } from '../models/userModel';
import {
  ERROR_FETCHING_USERS,
  ERROR_CREATING_USER,
  ERROR_DELETING_USER,
  USER_NOT_FOUND,
  ERROR_ID_REQUIRED,
  ERROR_FETCHING_USER_BY_ID,
} from '@/constants/errors';

const userService = new UserService();

// GET all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_FETCHING_USERS });
  }
};

// GET user by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_GATEWAY).json(ERROR_ID_REQUIRED);
      return;
    }
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: USER_NOT_FOUND });
      return;
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_FETCHING_USER_BY_ID });
  }
};

// POST create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Hashed password
    const newUser: IUser = {
      id: uuidv4(),
      email,
      password
    };
    
    const createdUser = await userService.createUser(newUser);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_CREATING_USER });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_GATEWAY).json(ERROR_ID_REQUIRED);
      return;
    }
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({ message: USER_NOT_FOUND });
    } else {
      res.status(StatusCodes.OK).json({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: ERROR_DELETING_USER });
  }
};
