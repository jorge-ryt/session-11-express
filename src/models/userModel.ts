import mongoose, { Schema } from 'mongoose';
import { IUserDBDocument } from '@/interfaces/userInterface';

// Define the Mongoose schema for User
const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a Mongoose model from the schema
const User = mongoose.model<IUserDBDocument>('User', userSchema);

export default User;
