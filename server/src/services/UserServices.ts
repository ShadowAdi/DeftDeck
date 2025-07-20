import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";

export const GetAllUsersService = async (
  query: { key: string; value: string } | {}
) => {
  try {
    const users = await UserModel.find(query);
    return users;
  } catch (error) {
    logger.error(`Failed to get all users ` + error);
    console.error(`Failed to get all users `, error);
    return error;
  }
};
