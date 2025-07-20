import { body } from "express-validator";
import { IsEmailTaken } from "../../services/UserServices.js";

export function CreateValidateUser() {
  return [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .toLowerCase()
      .isAlpha()
      .withMessage("Name must contain only alphabetical characters")
      .notEmpty()
      .withMessage("Name Should Not Be Empty"),
    body("email")
      .isEmail()
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Email Should Not Be Empty")
      .custom(async (email) => {
        const exists = await IsEmailTaken(email);
        if (exists) {
          throw new Error("Email already in use");
        }
        return true;
      }),
    body("companyName").trim().optional(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should Not Be Empty")
      .isLength({ min: 5 }),
    body("profileUrl")
      .trim()
      .default(
        "https://i.pinimg.com/736x/97/38/bd/9738bdd2658af637387dd5144e3ac528.jpg"
      ),
  ];
}
