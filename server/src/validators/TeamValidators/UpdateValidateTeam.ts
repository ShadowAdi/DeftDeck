import { body } from "express-validator";
import { isTeamWithSameName } from "../../services/TeamServivce.js";
import { AppError } from "../../utils/AppError.js";

export function UpdateUserValidator() {
  return [
    body("teamName")
      .trim()
      .isLength({ min: 3 })
      .optional()
      .custom(async (teamName) => {
        const exists = await isTeamWithSameName(teamName);
        if (exists) {
          throw new AppError("Team Name already in use",404);
        }
        return true;
      }),
    body("teamDescription").trim().optional(),
    body("teamImage").trim().optional(),
    body("teamTags").optional(),
  ];
}
