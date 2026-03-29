import logger from "../utils/logger.js";

// ❌ 404 handler
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

// ❌ Global error handler
export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};