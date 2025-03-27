import { ITask } from '../models/taskModel';

export interface ITaskService {
  getAllTasks(): Promise<ITask[]>;
  getTaskById(id: string): Promise<ITask | null>;
  createTask(ITask: ITask): Promise<ITask>;
  updateTask(id: string, updatedITask: ITask): Promise<ITask | null>;
  deleteTask(id: string): Promise<boolean>;
}
