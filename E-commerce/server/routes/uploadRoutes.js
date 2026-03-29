import express from "express";
import { uploadImages, deleteImage } from "../controllers/uploadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ADMIN ONLY
router.post("/", protect, adminOnly, upload.array("images", 8), uploadImages);
router.delete("/", protect, adminOnly, deleteImage);

export default router;