import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { TokenGenerator } from "../utils/TokenGenerator.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../config/EmailConfig.js";
import mongoose from "mongoose";

export const GetAllUsersService = async (
  query: { key: string; value: string } | {}
) => {
  try {
    const filter =
      "key" in query && "value" in query ? { [query.key]: query.value } : {};
    const users = await UserModel.find(filter)
      .select(
        "-v -password -isEmailVerified -verificationToken -emailVerificationSentAt -emailVerifiedAt -teams"
      )
      .lean();
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
    if (!userId) throw new AppError("User ID required", 400);

    const user = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $project: {
          v: 0,
          password: 0,
          verificationToken: 0,
          emailVerificationSentAt: 0,
          emailVerifiedAt: 0,
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "ownerId",
          as: "ownedTeams",
        },
      },
    ]);

    if (!user || user.length === 0) {
      logger.error(`Failed to get user with this id: ${userId} `);
      console.error(`Failed to get user with this id: ${userId}`);
      throw new AppError(`Failed to get user with this id: ${userId}`, 500);
    }
    return user[0];
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
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new UserModel({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      companyName: userData.companyName,
      profileUrl: userData?.profileUrl,
      verificationToken: verificationToken,
      emailVerificationSentAt: new Date(),
    });
    await user.save();
    await sendVerificationEmail(userData.email, verificationToken);
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

export const IsUserExistForToken = async (token: string) => {
  try {
    const isUserExist = await UserModel.findOne({ verificationToken: token });
    if (!isUserExist) {
      logger.error(`Failed to find user with token: ${token} `);
      console.error(`Failed to find user with token: ${token} `);
      throw new AppError(`Failed to find user with token: ${token} `, 500);
    }
    isUserExist.isEmailVerified = true;
    isUserExist.verificationToken = undefined;
    isUserExist.emailVerifiedAt = new Date();
    await isUserExist.save();
    return true;
  } catch (error) {
    logger.error(`Failed to verify user with token: ${token} `, error);
    console.error(`Failed to verify user with token: ${token} `, error);
    throw new AppError(
      `Failed to verify user with token: ${token} and error is: ${error}`,
      500
    );
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

export const UpdateUserService = async (
  id: string,
  updatedUserData: { name: string; profileUrl: string; companyName: string }
) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    logger.error(`Failed to update user: ` + error);
    console.error(`Failed to update user: `, error);
    throw new AppError(`Failed to update user: ${error}`, 500);
  }
};
