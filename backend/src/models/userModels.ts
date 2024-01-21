import { Schema, model } from 'mongoose';
import { UserType } from '../utils/types';

const userSchema = new Schema<UserType>({
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
  password: { type: String, required: true, minLength: 6 },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
});

export const User = model<UserType>('Book', userSchema);
