import { DBConnect } from "../db/db.js";
import { PORT } from "./DotEnvConfig.js";
import { logger } from "./loggerConfig.js";
import { Express } from "express";

export const AppConnect = (app: Express) => {
  try {
    if (!PORT) {
      logger.error("Failed to get PORT");
      console.error(`Failed to get PORT`);
    }
    const server = app.listen(PORT, () => {
      console.log(
        `Server started at PORT: ${PORT} and you can see here http://localhost:${PORT}`
      );
    });
    DBConnect(server);
  } catch (error) {
    logger.error(`Error in Starting the server at PORT: ${PORT}`);
    console.error(`Error in Starting the server at PORT: ${PORT}`);
  }
};
