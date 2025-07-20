import express from "express";
import { CreateUser, GetAllUsers } from "../controllers/UserController.js";
import { CreateValidateUser } from "../validators/UserValidators/userValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";

const UserRouter = express.Router();

UserRouter.get("/", GetAllUsers);
UserRouter.post("/", CreateValidateUser(), ValidateRequest, CreateUser);

export default UserRouter;
