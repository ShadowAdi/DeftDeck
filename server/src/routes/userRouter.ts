import express from "express";
import {
  authenticatedUser,
  CreateUser,
  DeleteUser,
  GetAllUsers,
  LoginUser,
  UpdatedUser,
} from "../controllers/UserController.js";
import { CreateValidateUser } from "../validators/UserValidators/userValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { userLoginValidator } from "../validators/UserValidators/userLoginValidator.js";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import { UpdateUserValidator } from "../validators/UserValidators/updateUserValidator.js";

const UserRouter = express.Router();

UserRouter.get("/", GetAllUsers);
UserRouter.post("/", CreateValidateUser(), ValidateRequest, CreateUser);
UserRouter.post("/login", userLoginValidator(), ValidateRequest, LoginUser);
UserRouter.get("/me", CheckAuth, authenticatedUser);
UserRouter.delete("/me", CheckAuth, DeleteUser);
UserRouter.patch(
  "/me",
  UpdateUserValidator(),
  ValidateRequest,
  CheckAuth,
  UpdatedUser
);

export default UserRouter;
