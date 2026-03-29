import multer from "multer";
import { AppError } from "../utils/AppError.js";

// store files temporarily (memory)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// optional error handler
export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return next(new AppError("File upload error", 400));
  }
  next(err);
};