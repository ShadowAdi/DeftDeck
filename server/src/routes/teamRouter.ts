import express from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import {
  CreateTeam,
  DeleteTeam,
  GetAllTeams,
  GetTeam,
  UpdateTeam,
} from "../controllers/TeamsController.js";

const TeamRouter = express.Router();

TeamRouter.get("/", CheckAuth, GetAllTeams);
TeamRouter.post("/", CheckAuth, CreateTeam);
TeamRouter.get("/team/:teamId", GetTeam);
TeamRouter.patch("/team/:teamId", CheckAuth, UpdateTeam);
TeamRouter.get("/team/:teamId", CheckAuth, DeleteTeam);

export default TeamRouter;
