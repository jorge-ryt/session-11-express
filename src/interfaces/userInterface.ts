import { IUser } from '../models/userModel';

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  deleteUser(id: string): Promise<boolean>;
}
