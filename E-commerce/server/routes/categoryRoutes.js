import express from "express";
import { Category } from "../models/index.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { successResponse } from "../utils/response.js";

const router = express.Router();

// PUBLIC
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();

    return successResponse(res, "Categories fetched", { categories });
  } catch (e) {
    next(e);
  }
});

// ADMIN
router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return successResponse(res, "Category created", { category }, 201);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return successResponse(res, "Category updated", { category });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });

    return successResponse(res, "Category deactivated");
  } catch (e) {
    next(e);
  }
});

export default router;