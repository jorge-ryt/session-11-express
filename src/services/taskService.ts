import { ITaskService } from '../interfaces/taskInterface';
import { ITask } from '../models/taskModel';
import fs from 'fs';
import { TASKS_FILE_PATH } from '../constants/filePaths';
import path from 'path';

export class TaskService implements ITaskService {
  private static readDataFromFile(): ITask[] {
    const filePath = path.resolve(TASKS_FILE_PATH);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  }

  private static writeDataToFile(tasks: ITask[]): void {
    const filePath = path.resolve(TASKS_FILE_PATH);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  }

  async getAllTasks(): Promise<ITask[]> {
    return TaskService.readDataFromFile();
  }

  async getTaskById(id: string): Promise<ITask | null> {
    const tasks = TaskService.readDataFromFile();
    return tasks.find(task => task.id === id) || null;
  }

  async createTask(task: ITask): Promise<ITask> {
    const tasks = TaskService.readDataFromFile();
    tasks.push(task);
    TaskService.writeDataToFile(tasks);
    return task;
  }

  async updateTask(id: string, updatedTask: ITask): Promise<ITask | null> {
    const tasks = TaskService.readDataFromFile();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask, updatedAt: new Date().toISOString() };
    TaskService.writeDataToFile(tasks);
    return tasks[taskIndex];
  }

  async deleteTask(id: string): Promise<boolean> {
    const tasks = TaskService.readDataFromFile();
    const updatedTasks = tasks.filter(task => task.id !== id);
    if (updatedTasks.length === tasks.length) return false;

    TaskService.writeDataToFile(updatedTasks);
    return true;
  }
}
