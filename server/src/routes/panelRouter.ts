import express from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";
import {
  CreatePanelController,
  DeletePanelController,
  GetUserPanelController,
  GetUserPanelsController,
  UpdatePanelController,
} from "../controllers/PanelController.js";
import { CreateValidatePanel } from "../validators/PanelValidators/PanelValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { UpdatePanelValidator } from "../validators/PanelValidators/UpdatePanelValidate.js";

const PanelRouter = express.Router();

PanelRouter.get("/:teamId", CheckAuth, GetUserPanelsController);
PanelRouter.post(
  "/:teamId",
  CreateValidatePanel(),
  ValidateRequest,
  CheckAuth,
  CreatePanelController
);
PanelRouter.patch(
  "/panel/:teamId",
  UpdatePanelValidator(),
  ValidateRequest,
  CheckAuth,
  UpdatePanelController
);
PanelRouter.delete("/panel/:teamId", CheckAuth, DeletePanelController);
PanelRouter.get("/panel/:teamId", CheckAuth, GetUserPanelController);

export default PanelRouter;
