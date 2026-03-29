import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import "dotenv/config";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import requestLogger from "./middleware/requestLogger.js";

const app = express();

// 🔐 Security
app.use(helmet());

// 🌐 CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ⚡ Rate limiting
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(
  "/api/v1/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
  })
);

// ⚠️ STRIPE WEBHOOK FIX (IMPORTANT)
app.use(
  "/api/v1/payments/webhook/stripe",
  express.raw({ type: "application/json" })
);

// 🧠 Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🛡️ Security
app.use(mongoSanitize());

// 📊 Logger
app.use(requestLogger);

// ❤️ Health check
app.get("/health", (_, res) =>
  res.json({ success: true, message: "API Healthy 🟢" })
);

// 🚀 Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/upload", uploadRoutes);

// ❌ Errors (LAST)
app.use(notFound);
app.use(errorHandler);

export default app;