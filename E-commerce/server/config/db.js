// ============================================================
// 📁 server/config/db.js  — MONGODB CONNECTION
// ============================================================
import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "shopora",
  });
  logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
};