import { Document, Types } from 'mongoose';

export interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  userId: Types.ObjectId;
}

export interface ITaskDBDocument extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  userId: Types.ObjectId;
}

export interface ITaskService {
  getAllTasks(): Promise<ITask[]>;
  getTaskById(id: string): Promise<ITask | null>;
  createTask(ITask: ITask): Promise<ITask>;
  updateTask(id: string, updatedITask: ITask): Promise<ITask | null>;
  deleteTask(id: string): Promise<boolean>;
}
