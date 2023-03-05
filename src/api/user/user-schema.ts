import moongose, { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  age: number;
  password: string;
  imageURL: string;
  friends: User[];
  enemies: User[];
}

const userSchema = new Schema<User>({
  name: String,
  email: String,
  age: Number,
  password: String,
  imageURL: String,
  friends: Array,
  enemies: Array,
});

export const UserModel = moongose.model<User>('User', userSchema, 'users');
