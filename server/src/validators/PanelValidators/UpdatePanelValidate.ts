import { body } from "express-validator";
import { isPanelWithSameName } from "../../services/PanelService.js";
import { AppError } from "../../utils/AppError.js";

export function UpdatePanelValidator() {
  return [
    body("panelName")
      .trim()
      .isLength({ min: 3 })
      .optional()
      .custom(async (panelName) => {
        const exists = await isPanelWithSameName(panelName);
        if (exists) {
          throw new AppError("Panel Name already in use", 404);
        }
        return true;
      }),
    body("panelDescription").trim().optional(),
    body("panelIcon").trim().optional(),
    body("panelCoverPic").trim().optional(),
    body("panelTags").optional(),
    body("panelColor").trim().optional(),
  ];
}
