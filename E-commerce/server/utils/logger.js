import winston from "winston";
import fs from "fs";
import { join } from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    new winston.transports.File({
      filename: join(logDir, "error.log"),
      level: "error",
    }),

    new winston.transports.File({
      filename: join(logDir, "combined.log"),
    }),
  ],
});

export default logger;