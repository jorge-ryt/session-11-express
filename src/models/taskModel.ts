import mongoose, { Schema } from 'mongoose';
import { ITaskDBDocument } from '@/interfaces/taskInterface'; 

// Define the Mongoose schema for User
const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

// Create a Mongoose model from the schema
const Task = mongoose.model<ITaskDBDocument>('Task', taskSchema);

export default Task;




  