import { IUserService, IUser } from "@/interfaces/userInterface";
import User from "@/models/userModel";

/**
 * Old implementation
 */
import fs from "fs";
import { USERS_FILE_PATH } from "@/constants/filePaths";

export class UserService implements IUserService {
  /**
   * 
   * Old implementation
   */
  // private static readDataFromFile(): IUser[] {
  //   if (!fs.existsSync(USERS_FILE_PATH)) {
  //     fs.writeFileSync(USERS_FILE_PATH, JSON.stringify([]));
  //   }
  //   const data = fs.readFileSync(USERS_FILE_PATH, "utf-8");
  //   return JSON.parse(data);
  // }

  // private static writeDataToFile(users: IUser[]): void {
  //   fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
  // }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find().exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).exec();
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return await newUser.save();
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
