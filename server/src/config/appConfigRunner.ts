import { PORT } from "./DotEnvConfig.js";
import { logger } from "./loggerConfig.js";
import { Express } from "express";

export const AppConnect = (app: Express) => {
  try {
    if (!PORT) {
      logger.error("Port Do Not Find");
      console.error(`Port do not found in the file`);
    }
    app.listen(PORT, () => {
      console.log(
        `Server started at PORT: ${PORT} and you can see here http://localhost:${PORT}`
      );
    });
  } catch (error) {
    logger.error(`Error in Starting the server at PORT: ${PORT}`);
    console.error(`Error in Starting the server at PORT: ${PORT}`);
  }
};
