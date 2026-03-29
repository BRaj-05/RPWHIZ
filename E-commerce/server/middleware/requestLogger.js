import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
  });
  next();
};

export default requestLogger;