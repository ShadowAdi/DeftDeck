import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import {
  CreateUserService,
  DeleteUserService,
  GetAllUsersService,
  IsUserExists,
  LoginUserService,
  UpdateUserService,
} from "../services/UserServices.js";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";

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
     await CreateUserService(userData);
    return response.status(201).json({
      success: true,
      message: "User Created successfully.",
    });
  }
);

export const LoginUser = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    const { token, isUser } = await LoginUserService(userData);
    return response.status(200).json({
      success: true,
      message: "User Login successfully.",
      data: isUser,
      token,
    });
  }
);

export const authenticatedUser = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;
    if (!user) {
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email } = user;
    const userDetail = await IsUserExists(email);
    return response.status(200).json({
      success: true,
      message: "Authenticated User Found Successfully",
      userDetail,
    });
  }
);

export const DeleteUser = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;
    if (!user) {
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email } = user;
    const userDetail = await IsUserExists(email);
    if (userDetail) {
      const isDeleted = await DeleteUserService(String(userDetail._id));
      return response.status(200).json({
        success: isDeleted,
        message: "Account Deleted",
      });
    }
  }
);

export const UpdatedUser = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    const { user } = request;
    if (!user) {
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email } = user;
    const userDetail = await IsUserExists(email);
    if (userDetail) {
      const updatedUser = await UpdateUserService(
        String(userDetail._id),
        userData
      );
      return response.status(200).json({
        success: updatedUser,
        message: "Account Updated",
      });
    }
  }
);
