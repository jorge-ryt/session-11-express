import { Types } from "mongoose";
import { ITaskService, ITask } from "@/interfaces/taskInterface";
import Task from "@/models/taskModel";
/**
 * Old implementation
 */
// import fs from "fs";
// import { TASKS_FILE_PATH } from "@/constants/filePaths";
// import path from "path";


export class TaskService implements ITaskService {
  /**
   * 
   * Old implementation
   */
  // private static readDataFromFile(): ITask[] {
  //   const filePath = path.resolve(TASKS_FILE_PATH);
  //   if (!fs.existsSync(filePath)) {
  //     fs.writeFileSync(filePath, JSON.stringify([]));
  //   }
  //   const data = fs.readFileSync(filePath, { encoding: "utf8" });
  //   return JSON.parse(data);
  // }

  // private static writeDataToFile(tasks: ITask[]): void {
  //   const filePath = path.resolve(TASKS_FILE_PATH);
  //   fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  // }

  async getAllTasks(): Promise<ITask[]> {
    return await Task.find().exec();
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id).exec();
  }

  async getTasksByUserId(userId: Types.ObjectId): Promise<ITask[]> {
    return await Task.find({ userId }).exec();
  }

  async createTask(task: ITask): Promise<ITask> {
    const newTask = new Task(task);
    return await newTask.save();
  }

  async updateTask(id: string, updatedTask: ITask): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(
      id,
      { ...updatedTask, updatedAt: new Date().toISOString() },
      { new: true } // return the updated task
    ).exec();
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await Task.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
