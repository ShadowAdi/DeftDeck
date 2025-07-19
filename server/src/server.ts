import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { AppConnect } from "./config/appConfigRunner.js";

const app = express();

CorsConfig(app);
app.use(express.json());

AppConnect(app);
