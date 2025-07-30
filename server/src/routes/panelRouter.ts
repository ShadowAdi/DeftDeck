import express from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import { GetUserPanelsController } from "../controllers/PanelController.js";

const PanelRouter = express.Router();

PanelRouter.get("/:teamId", CheckAuth, GetUserPanelsController);

export default PanelRouter;
