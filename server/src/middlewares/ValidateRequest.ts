import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const ValidateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.type,
      message: err.msg,
    }));
    return response.status(400).json({
      success: false,
      errors: extractedErrors,
    });
  }
};
