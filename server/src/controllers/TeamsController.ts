import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";
import { IsUserExists } from "../services/UserServices.js";
import {
  CreateTeamService,
  DeleteTeamService,
  GetAllTeamsService,
  GetTeamService,
  isTeamExist,
  UpdateTeamService,
} from "../services/TeamServivce.js";

export const GetAllTeams = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { key, value } = request.query;
    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request `);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }
    const teams = await GetAllTeamsService(
      key && value ? { key: value } : {},
      sub
    );
    return response.status(200).json({
      success: true,
      teams,
    });
  }
);

export const GetTeam = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const teamId = request.params.teamId;
    if (!teamId) {
      console.error(`Team Id Is Not Given`);
      logger.error(`Team Id Is Not Given`);
      throw new AppError(`Team Id Is Not Given`, 401);
    }
    const team = await GetTeamService(teamId);
    return response.status(200).json({
      success: true,
      team,
    });
  }
);

export const CreateTeam = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      console.error(`User with the email:${email} don't exists`);
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }
    const teamData = request.body;
    await CreateTeamService(teamData, sub)
    return response.status(201).json({
      success: true,
      messaged: "Team is Created",
    });
  }
);

export const UpdateTeam = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const teamId = request.params.teamId;
    if (!teamId) {
      console.error(`Team Id Is Not Given`);
      logger.error(`Team Id Is Not Given`);
      throw new AppError(`Team Id Is Not Given`, 401);
    }
    const { user } = request;
    if (!user) {
      console.error(`Team Id Is Not Given`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }
    const isTeam = await isTeamExist(teamId);
    if (!isTeam) {
      logger.error(`Team Not Found`);
      console.error(`Team Not Found`);
      throw new AppError(`Team Not Found`, 404);
    }
    if (String(isTeam.ownerId) !== sub) {
      logger.error(`You Are Not Authenticated to update team`);
      console.error(`You Are Not Authenticated to update team`);
      throw new AppError(`You Are Not Authenticated to update team`, 401);
    }
    const teamData = request.body;
    const updatedTeam = await UpdateTeamService(teamData, teamId);
    return response.status(200).json({
      success: true,
      messaged: "Team is Updated",
      updatedTeam,
    });
  }
);

export const DeleteTeam = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const teamId = request.params.teamId;
    if (!teamId) {
      console.error(`Team Id Is Not Given`);
      logger.error(`Team Id Is Not Given`);
      throw new AppError(`Team Id Is Not Given`, 401);
    }
    const { user } = request;
    if (!user) {
      console.error(`Team Id Is Not Given`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }
    const isTeam = await isTeamExist(teamId);
    if (!isTeam) {
      logger.error(`Team Not Found`);
      console.error(`Team Not Found`);
      throw new AppError(`Team Not Found`, 404);
    }
    if (String(isTeam.ownerId) !== sub) {
      logger.error(`You Are Not Authenticated to delete team`);
      console.error(`You Are Not Authenticated to delete team`);
      throw new AppError(`You Are Not Authenticated to delete team`, 401);
    }
    await DeleteTeamService(teamId);
    return response.status(200).json({
      success: true,
      messaged: "Team is Deleted",
    });
  }
);
