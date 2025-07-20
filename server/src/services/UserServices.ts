import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const GetAllUsersService = async (
  query: { key: string; value: string } | {}
) => {
  try {
    const filter =
      "key" in query && "value" in query ? { [query.key]: query.value } : {};
    const users = await UserModel.find(filter);
    return users;
  } catch (error) {
    logger.error(`Failed to get all users ${error}` + error);
    console.error(`Failed to get all users ${error}`, error);
    throw new AppError(
      `Error Fetching Users From DB and error is: ${error}`,
      500
    );
  }
};

export const GetUserService = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    logger.error(`Failed to get user with this id: ${userId} ` + error);
    console.error(`Failed to get user with this id: ${userId} `, error);
    throw new AppError(
      `Failed to get user with this id: ${userId} and error is: ${error}`,
      500
    );
  }
};

export const CreateUserService = async (userData: {
  email: string;
  name: string;
  password: string;
  profileUrl: string | null;
  companyName: string;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new UserModel({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      companyName: userData.companyName,
      profileUrl: userData?.profileUrl,
    });
    await user.save();
    return user;
  } catch (error) {
    logger.error(`Failed to create user: ` + error);
    console.error(`Failed to create user: `, error);
    throw new AppError(`Failed to create user: ${error}`, 500);
  }
};

export const IsEmailTaken = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return !!user;
};
