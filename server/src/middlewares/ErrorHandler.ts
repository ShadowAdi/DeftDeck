import { NextFunction, Request, Response } from "express";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";

export const CustomErrorHandler = (
  err: AppError,
  req: Request,
  response: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  logger.error(
    `Failed to get the error the status code is ${err.status} and the message is ${err.message}`
  );
  response.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
};
