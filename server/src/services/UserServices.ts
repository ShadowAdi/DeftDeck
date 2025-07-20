import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";

export const GetAllUsersService = async (
  query: { key: string; value: string } | {}
) => {
  try {
    const filter =
      "key" in query && "value" in query ? { [query.key]: query.value } : {};
    const users = await UserModel.find(filter);
    return users;
  } catch (error) {
    logger.error(`Failed to get all users ` + error);
    console.error(`Failed to get all users `, error);
    throw new AppError(`Error Fetching Users From DB`, 500);
  }
};
