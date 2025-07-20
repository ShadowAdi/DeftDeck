import express from "express";
import { CreateUser, GetAllUsers } from "../controllers/UserController.js";
import { CreateValidateUser } from "../validators/UserValidators/userValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { userLoginValidator } from "../validators/UserValidators/userLoginValidator.js";

const UserRouter = express.Router();

UserRouter.get("/", GetAllUsers);
UserRouter.post("/", CreateValidateUser(), ValidateRequest, CreateUser);
UserRouter.post("/login", userLoginValidator(), ValidateRequest, CreateUser);

export default UserRouter;
