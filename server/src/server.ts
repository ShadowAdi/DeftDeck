import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { AppConnect } from "./config/appConfigRunner.js";
import { healthRouter } from "./routes/healthRouter.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/health", healthRouter);

AppConnect(app);
