import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// Define custom log format
const logFormat = format.printf(
  ({ level, message, timestamp }) =>
    `${timestamp} ${level.toUpperCase()}: ${message}`
);

// Create a logger instance
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      dirname: path.join(process.cwd(), "./logs"),
      filename: "%DATE%.log",
      datePattern: "YYYYMMDD",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Set Log
export const log = (message, level = "info") => {
  // Log Message using winston logger
  logger.log({ level, message });
};
