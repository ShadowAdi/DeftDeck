import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { GetAllUsersService } from "../services/UserServices.js";

export const GetAllUsers = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await GetAllUsersService({});
    if (users instanceof Error) {
      return response.status(500).json({
        success: false,
        message: "Failed to retrieve users.",
        error: users.message,
      });
    }
  }
);
