import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import {
  CreateUserService,
  GetAllUsersService,
} from "../services/UserServices.js";

export const GetAllUsers = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { key, value } = request.query;
    const users = await GetAllUsersService(key && value ? { key, value } : {});
    return response.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  }
);

export const CreateUser = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    const userCreated = await CreateUserService(userData);
    return response.status(200).json({
      success: true,
      message: "User Created successfully.",
      data: userCreated,
    });
  }
);
