import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { AppConnect } from "./config/appConfigRunner.js";
import { healthRouter } from "./routes/healthRouter.js";
import UserRouter from "./routes/userRouter.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/user", UserRouter);


AppConnect(app);
