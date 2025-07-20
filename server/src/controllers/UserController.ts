import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { GetAllUsersService } from "../services/UserServices.js";

export const GetAllUsers = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await GetAllUsersService({});
    return response.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  }
);
