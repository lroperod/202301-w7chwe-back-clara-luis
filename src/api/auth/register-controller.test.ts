import { registerUserController } from './register-controller';
import { Request, Response } from 'express';
import { UserModel } from '../user/user-schema';
import dotenv from 'dotenv';
dotenv.config();
import { encryptPassword } from './auth-utils';

describe('Given a user registration controller', () => {
  const request = {
    body: {
      email: 'some@example.com',
      password: 'password',
    },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const newUser = {
    email: 'some@example.com',
    password: encryptPassword('password'),
  };

  test('When the email and password are correct, a user should be created', async () => {
    UserModel.create = jest.fn();
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toHaveBeenCalledWith(201);
    expect(UserModel.create).toHaveBeenCalledWith(newUser);
  });

  test('When the user already exists, it should respond with a 409 error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toHaveBeenCalledWith(409);
  });

  test('When there is an error with the registration, the server should return a 500 error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockRejectedValue(500),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toBeCalledWith(500);
  });
});
