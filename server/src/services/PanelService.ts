import { logger } from "../config/loggerConfig.js";
import { PanelModel } from "../models/PanelModel.js";
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
