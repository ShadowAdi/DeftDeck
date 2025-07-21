import { body } from "express-validator";

export function UpdateUserValidator() {
  return [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .toLowerCase()
      .isAlpha()
      .withMessage("Name must contain only alphabetical characters")
      .notEmpty()
      .withMessage("Name Should Not Be Empty")
      .optional(),
    body("companyName").trim().optional(),
    body("profileUrl").trim().optional(),
  ];
}
