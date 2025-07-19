import { Response } from "express";
import { logger } from "../config/loggerConfig.js";

export const HealthCheckController = async (Response: Response) => {
  try {
    logger.info(`API Is working`);
    return Response.status(200).json({
      message: "API Is working",
      success: true,
    });
  } catch (error) {
    logger.error(`Error in checking health controller `, error);
    console.error(`Error in checking health Controller`);
  }
};
