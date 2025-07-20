import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { TokenGenerator } from "../utils/TokenGenerator.js";

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

export const LoginUserService = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const isUser = await IsUserExists(userData.email);
    if (!isUser) {
      throw new AppError(
        `Account With This Email ${userData.email} Not Exists. You Should Try To Login First`,
        404
      );
    }
    const isPasswordExists = await bcrypt.compare(
      userData.password,
      isUser?.password
    );
    if (!isPasswordExists) {
      throw new AppError(`Invalid Credentials`, 401);
    }
    const payload = { email: isUser.email, sub: String(isUser._id) };
    const token = await TokenGenerator(payload);
    return { token, isUser };
  } catch (error) {
    logger.error(`Failed to login user: ` + error);
    console.error(`Failed to login user: `, error);
    throw new AppError(`Failed to login user: ${error}`, 500);
  }
};

export const IsEmailTaken = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return !!user;
  } catch (error) {
    logger.error(`Failed to find user with email:${email} ` + error);
    console.error(`Failed to find user with email:${email} `, error);
    throw new AppError(
      `Failed to find user with email:${email} and error is ${error}`,
      500
    );
  }
};

export const IsUserExists = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    logger.error(`Failed to find user: ` + error);
    console.error(`Failed to find user: `, error);
    throw new AppError(`Failed to find user: ${error}`, 500);
  }
};

export const DeleteUserService = async (id: string) => {
  try {
    await UserModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    logger.error(`Failed to delete user: ` + error);
    console.error(`Failed to delete user: `, error);
    throw new AppError(`Failed to delete user: ${error}`, 500);
  }
};
