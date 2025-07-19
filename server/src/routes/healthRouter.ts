import express from "express";
import { HealthCheckController } from "../controllers/healthCheckController.js";

export const healthRouter = express.Router();

healthRouter.get("/", HealthCheckController);
