import { RequestHandler } from 'express';
import { User, UserModel } from '../user/user-schema.js';
import { encryptPassword } from './auth-utils.js';

export type AuthRequest = Pick<User, 'email' | 'password'>;

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingDBUser = await UserModel.findOne({ email }).exec();
    if (existingDBUser !== null) {
      return res.status(409).json({ msg: 'User is already registered in app' });
    }

    const user = {
      email,
      password: encryptPassword(password),
    };
    await UserModel.create(user);
    res.status(201).json({ message: 'New user succesfully created!' });
  } catch {
    res.status(500);
  }
};
