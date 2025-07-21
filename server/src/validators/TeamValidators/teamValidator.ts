import { body } from "express-validator";
import { isTeamWithSameName } from "../../services/TeamServivce.js";

export function CreateValidateTeam() {
  return [
    body("teamName")
      .trim()
      .isLength({ min: 3 })
      .notEmpty()
      .withMessage("Team Name Should Not Be Empty")
      .custom(async (teamName) => {
        const exists = await isTeamWithSameName(teamName);
        if (exists) {
          throw new Error("Team Name alreafy in use");
        }
        return true;
      }),
    body("teamDescription").trim().optional(),
    body("teamImage").trim().optional(),
    body("teamTags").optional(),
  ];
}
