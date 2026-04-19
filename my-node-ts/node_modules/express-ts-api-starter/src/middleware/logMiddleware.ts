import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const logDirectory = path.join(__dirname, "../../logs");
const logFile = path.join(logDirectory, "app.log");

// Ensure logs directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const responseTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2); // ms
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms\n`;
    fs.appendFile(logFile, log, (err) => {
      if (err) {
        // Optionally handle error (e.g., log to console)
        console.error("Failed to write log:", err);
      }
    });
  });

  next();
};

export default logMiddleware;
