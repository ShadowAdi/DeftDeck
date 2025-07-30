import { NextFunction, Request, Response } from "express";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";
import { IsUserExists } from "../services/UserServices.js";
import {
  CreatePanelService,
  DeletePanelService,
  GetAllPanelsService,
  GetPanelService,
  IsPanelExist,
} from "../services/PanelService.js";

export const GetUserPanelsController = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { teamId } = request.params;
    const { key, value } = request.query;
    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }

    if (!teamId) {
      logger.error(
        `Team id is not given it was required to get panel `,
        teamId
      );
      console.error(`Team id is not given it was required to get panel`);
      throw new AppError(
        `Team id is not given it was required to get panel`,
        402
      );
    }

    const teams = await GetAllPanelsService(
      key && value ? { key, value } : {},
      sub,
      teamId
    );
    return response.status(200).json({
      success: true,
      teams,
    });
  }
);

export const GetUserPanelController = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { panelId } = request.params;
    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }

    if (!panelId) {
      logger.error(
        `Panel id is not given it was required to get panel `,
        panelId
      );
      console.error(`Panel id is not given it was required to get panel`);
      throw new AppError(
        `Panel id is not given it was required to get panel`,
        402
      );
    }

    const panelFound = await GetPanelService(sub, panelId);
    return response.status(200).json({
      success: true,
      panelFound,
    });
  }
);

export const CreatePanelController = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { teamId } = request.params;

    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }

    if (!teamId) {
      logger.error(
        `Team id is not given it was required to get panel `,
        teamId
      );
      console.error(`Team id is not given it was required to get panel`);
      throw new AppError(
        `Team id is not given it was required to get panel`,
        402
      );
    }

    const panelData = request.body;
    const createPanelData = await CreatePanelService(teamId, sub, panelData);
    return response.status(201).json({
      success: true,
      messaged: "Panel is Created",
      createPanelData,
    });
  }
);

export const DeletePanelController = CustomTryCatch(
  async (request: Request, response: Response, next: NextFunction) => {
    const { panelId } = request.params;
    const { user } = request;
    if (!user) {
      console.error(`User Not Found in the request`);
      logger.error(`User Not Found in the request `, request?.user);
      throw new AppError(`You Are Not Authenticated`, 401);
    }
    const { email, sub } = user;
    const userDetail = await IsUserExists(email);
    if (!userDetail) {
      logger.error(`User with the email:${email} don't exists`);
      throw new AppError(`User with the email:${email} don't exists`, 401);
    }

    if (!panelId) {
      logger.error(
        `Panel id is not given it was required to get panel `,
        panelId
      );
      console.error(`Panel id is not given it was required to get panel`);
      throw new AppError(
        `Panel id is not given it was required to get panel`,
        402
      );
    }

    const isPanelExist = await IsPanelExist(sub, panelId);
    if (!isPanelExist) {
      logger.error(`Panel with this id:${panelId} dont exist `, panelId);
      console.error(`Panel with this id:${panelId} dont exist `);
      throw new AppError(`Panel with this id:${panelId} dont exist `, 402);
    }

    const message = await DeletePanelService(panelId);
    return response.status(200).json({
      success: true,
      message,
    });
  }
);
