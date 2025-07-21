import { body } from "express-validator";

export function UpdateUserValidator() {
  return [
    body("teamName")
      .trim()
      .isLength({ min: 3 })
      .optional(),
    body("teamDescription").trim().optional(),
    body("teamImage").trim().optional(),
    body("teamTags").optional()
  ];
}
