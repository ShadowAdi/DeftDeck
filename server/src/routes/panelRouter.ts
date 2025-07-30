import express from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import {
  CreatePanelController,
  GetUserPanelController,
  GetUserPanelsController,
} from "../controllers/PanelController.js";

const PanelRouter = express.Router();

PanelRouter.get("/:teamId", CheckAuth, GetUserPanelsController);
PanelRouter.post("/:teamId", CheckAuth, CreatePanelController);
PanelRouter.get("/panel/:teamId", CheckAuth, GetUserPanelController);

export default PanelRouter;
