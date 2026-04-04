import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./sockets/socketManager.js";
import { createServer } from "http";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

// 🔥 Socket init
initSocket(httpServer);

// 🚀 Start server
connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("DB connection failed", err);
    process.exit(1);
  });

// ❌ Unhandled Promise
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection", err);
  process.exit(1);
});

// ❌ Uncaught Exception
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
  process.exit(1);
});