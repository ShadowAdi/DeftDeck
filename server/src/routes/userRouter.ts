import express from "express";
import {
  authenticatedUser,
  CreateUser,
  DeleteUser,
  GetAllUsers,
  LoginUser,
} from "../controllers/UserController.js";
import { CreateValidateUser } from "../validators/UserValidators/userValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { userLoginValidator } from "../validators/UserValidators/userLoginValidator.js";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";

const UserRouter = express.Router();

UserRouter.get("/", GetAllUsers);
UserRouter.post("/", CreateValidateUser(), ValidateRequest, CreateUser);
UserRouter.post("/login", userLoginValidator(), ValidateRequest, LoginUser);
UserRouter.get("/me", CheckAuth, authenticatedUser);
UserRouter.delete("/me", CheckAuth, DeleteUser);


export default UserRouter;
