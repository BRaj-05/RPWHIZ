import { Server } from "socket.io";
import { auth } from "../config/firebase.js";
import logger from "../utils/logger.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // 🔐 AUTH MIDDLEWARE
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Socket auth token missing"));
      }

      const decoded = await auth.verifyIdToken(token);

      socket.user = {
        id: decoded.uid,
        email: decoded.email,
        isAdmin: !!decoded.admin,
      };

      next();
    } catch (err) {
      logger.error("Socket auth error", { error: err.message });
      next(new Error("Invalid socket token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`🔌 Connected: ${socket.id} | User: ${socket.user.id}`);

    // user room
    socket.join(`user:${socket.user.id}`);

    // admin room
    if (socket.user.isAdmin) {
      socket.join("admin:room");
    }

    // events
    socket.on("join:order", (orderId) => {
      socket.join(`order:${orderId}`);
    });

    socket.on("leave:order", (orderId) => {
      socket.leave(`order:${orderId}`);
    });

    socket.on("ping", (cb) => {
      if (typeof cb === "function") cb({ status: "pong" });
    });

    socket.on("disconnect", (reason) => {
      logger.info(`❌ Disconnected: ${socket.id} | ${reason}`);
    });
  });

  logger.info("✅ Socket initialized");
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};