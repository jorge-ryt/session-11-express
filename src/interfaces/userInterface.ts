import { Document } from 'mongoose';
export interface IUser {
  email: string;
  password: string;
}

export interface IUserDBDocument extends Document {
  email: string;
  password: string;
}

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  deleteUser(id: string): Promise<boolean>;
}
