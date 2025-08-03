import { logger } from "../config/loggerConfig.js";
import { TeamModel } from "../models/TeamsModel.js";
import {
  CreateTeamDataInterface,
  UpdateTeamDataInterface,
} from "../types/teams/TeamData.js";
import { AppError } from "../utils/AppError.js";

export const GetAllTeamsService = async (
  query:
    | {
        key: string;
        value: string;
      }
    | {},
  userId: String
) => {
  try {
    const filter =
      "key" in query && "value" in query ? { [query.key]: query.value } : {};
    const teams = await TeamModel.find({ ownerId: userId, ...filter }).lean();
    return teams;
  } catch (error) {
    logger.error(`Failed to find teams: ` + error);
    console.error(`Failed to find teams: `, error);
    throw new AppError(`Failed to find teams: ${error}`, 500);
  }
};

export const GetTeamService = async (teamId: string) => {
  try {
    const teamFound = await TeamModel.findById(teamId).lean();
    if (!teamFound) {
      logger.error(`Team Not Found`);
      console.error(`Team Not Found`);
      throw new AppError(`Team Not Found`, 500);
    }
    return teamFound;
  } catch (error) {
    logger.error(`Failed to get team with the id:${teamId} ` + error);
    console.error(`Failed to get team with the id:${teamId} `, error);
    throw new AppError(
      `Failed to get team with the id:${teamId} and error is: ${error}`,
      500
    );
  }
};

export const CreateTeamService = async (
  teamData: CreateTeamDataInterface,
  userId: string
) => {
  try {
    const createTeamData = {
      ownerId: userId,
      members: [{ member: userId, role: "ADMIN" }],
      ...teamData,
    };
    const createdTeam = new TeamModel(createTeamData);
    await createdTeam.save();
    return createdTeam;
  } catch (error) {
    logger.error(`Failed to create team` + error);
    console.error(`Failed to create team`, error);
    throw new AppError(`Failed to create team and error is: ${error}`, 500);
  }
};

export const UpdateTeamService = async (
  teamData: UpdateTeamDataInterface,
  teamId: string
) => {
  try {
    const updatedTeam = await TeamModel.findByIdAndUpdate(teamId, teamData, {
      new: true,
    });
    return updatedTeam;
  } catch (error) {
    logger.error(`Failed to update team` + error);
    console.error(`Failed to update team`, error);
    throw new AppError(`Failed to update team and error is: ${error}`, 500);
  }
};

export const DeleteTeamService = async (teamId: string) => {
  try {
    await TeamModel.findByIdAndDelete(teamId);
  } catch (error) {
    logger.error(`Failed to delete team` + error);
    console.error(`Failed to delete team`, error);
    throw new AppError(`Failed to delete team and error is: ${error}`, 500);
  }
};

export const isTeamExist = async (teamId: string) => {
  try {
    const teamFound = await TeamModel.findById(teamId);

    return teamFound;
  } catch (error) {
    logger.error(`Failed to get team with the id:${teamId} ` + error);
    console.error(`Failed to get team with the id:${teamId} `, error);
    throw new AppError(
      `Failed to get team with the id:${teamId} and error is: ${error}`,
      500
    );
  }
};

export const isTeamWithSameName = async (teamName: string) => {
  try {
    const teamFound = await TeamModel.exists({ teamName });
    if (teamFound) {
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Failed to get team with the name:${teamName} ` + error);
    console.error(`Failed to get team with the name:${teamName} `, error);
    throw new AppError(
      `Failed to get team with the name:${teamName} and error is: ${error}`,
      500
    );
  }
};
