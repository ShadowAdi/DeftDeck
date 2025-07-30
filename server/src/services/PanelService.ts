import { logger } from "../config/loggerConfig.js";
import { PanelModel } from "../models/PanelModel.js";
import { CreatePanelDataInterface } from "../types/panel/PanelData.js";
import { AppError } from "../utils/AppError.js";

export const GetAllPanelsService = async (
  query:
    | {
        key: string;
        value: string;
      }
    | {},
  userId: String,
  teamId: string
) => {
  try {
    const filter =
      "key" in query && "value" in query ? { [query.key]: query.value } : {};
    const panels = await PanelModel.find({
      teamId: teamId,
      createdBy: userId,
      ...filter,
    });
    return panels;
  } catch (error) {
    logger.error(`Failed to find panels: ` + error);
    console.error(`Failed to find panels: `, error);
    throw new AppError(`Failed to find panels: ${error}`, 500);
  }
};

export const GetPanelService = async (userId: String, panelId: string) => {
  try {
    const panelFound = await PanelModel.find({
      createdBy: userId,
      _id: panelId,
    });
    return panelFound;
  } catch (error) {
    logger.error(`Failed to find panel with id: ${panelId} ` + error);
    console.error(`Failed to find panel with id: ${panelId} `, error);
    throw new AppError(
      `Failed to find panel with id: ${panelId} and error is: ${error}`,
      500
    );
  }
};

export const IsPanelExist = async (userId: String, panelId: string) => {
  try {
    const panelFound = await PanelModel.find({
      createdBy: userId,
      _id: panelId,
    });
    if (panelFound) {
        return true
    }
    return false;
  } catch (error) {
    logger.error(`Failed to find panel with id: ${panelId} ` + error);
    console.error(`Failed to find panel with id: ${panelId} `, error);
    throw new AppError(
      `Failed to find panel with id: ${panelId} and error is: ${error}`,
      500
    );
  }
};


export const CreatePanelService = async (
  teamId: string,
  userId: string,
  panelData: CreatePanelDataInterface
) => {
  try {
    const createPanelData = { teamId, createdBy: userId, ...panelData };
    const newPanel = new PanelModel(createPanelData);
    await newPanel.save();
    return newPanel;
  } catch (error) {
    logger.error(`Failed to create panel` + error);
    console.error(`Failed to create panel`, error);
    throw new AppError(`Failed to create panel and error is: ${error}`, 500);
  }
};

export const DeletePanelService = async (panelId: string) => {
  try {
    await PanelModel.findByIdAndDelete(panelId);
    return "Pannel is deleted successfully";
  } catch (error) {
    logger.error(`Failed to delete panel` + error);
    console.error(`Failed to delete panel`, error);
    throw new AppError(`Failed to delete panel and error is: ${error}`, 500);
  }
};
