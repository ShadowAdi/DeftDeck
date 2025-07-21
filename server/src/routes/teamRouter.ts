import express from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import {
  CreateTeam,
  DeleteTeam,
  GetAllTeams,
  GetTeam,
  UpdateTeam,
} from "../controllers/TeamsController.js";
import { CreateValidateTeam } from "../validators/TeamValidators/teamValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { UpdateUserValidator } from "../validators/UserValidators/updateUserValidator.js";

const TeamRouter = express.Router();

TeamRouter.get("/", CheckAuth, GetAllTeams);
TeamRouter.post(
  "/",
  CreateValidateTeam(),
  ValidateRequest,
  CheckAuth,
  CreateTeam
);
TeamRouter.get("/team/:teamId", GetTeam);
TeamRouter.patch(
  "/team/:teamId",
  UpdateUserValidator(),
  ValidateRequest,
  CheckAuth,
  UpdateTeam
);
TeamRouter.get("/team/:teamId", CheckAuth, DeleteTeam);

export default TeamRouter;
