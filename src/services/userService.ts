import { IUserService } from '../interfaces/userInterface';
import { IUser } from '../models/userModel';
import fs from 'fs';
import { USERS_FILE_PATH } from '../constants/filePaths';

export class UserService implements IUserService {
  private static readDataFromFile(): IUser[] {
    if (!fs.existsSync(USERS_FILE_PATH)) {
      fs.writeFileSync(USERS_FILE_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }

  private static writeDataToFile(users: IUser[]): void {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
  }

  async getAllUsers(): Promise<IUser[]> {
    return UserService.readDataFromFile();
  }

  async getUserById(id: string): Promise<IUser | null> {
    const users = UserService.readDataFromFile();
    return users.find(user => user.id === id) || null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const users = UserService.readDataFromFile();
    users.push(user);
    UserService.writeDataToFile(users);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = UserService.readDataFromFile();
    const updatedUsers = users.filter(user => user.id !== id);
    if (updatedUsers.length === users.length) return false;

    UserService.writeDataToFile(updatedUsers);
    return true;
  }
}
