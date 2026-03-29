import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/product/:productId", getProductReviews);

// USER
router.post("/product/:productId", protect, addReview);

// USER / ADMIN
router.delete("/:id", protect, deleteReview);

export default router;