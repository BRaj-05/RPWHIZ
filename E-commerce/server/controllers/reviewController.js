import { Review, Product } from "../models/index.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/response.js";

// ADD REVIEW
export const addReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;

    if (!productId) return next(new AppError("Product ID required", 400));
    if (!rating || rating < 1 || rating > 5) {
      return next(new AppError("Rating must be between 1 and 5", 400));
    }

    // ✅ Check product exists
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));

    // ❌ prevent duplicate
    const existing = await Review.findOne({
      product: productId,
      user: req.user.id,
    });

    if (existing) {
      return next(new AppError("You already reviewed this product", 409));
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      title,
      comment,
    });

    return successResponse(res, "Review submitted", { review }, 201);
  } catch (err) {
    next(err);
  }
};

// GET REVIEWS
export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({
        product: productId,
        isDeleted: false,
        isApproved: true,
      })
        .populate("user", "name avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Review.countDocuments({
        product: productId,
        isDeleted: false,
      }),
    ]);

    return successResponse(res, "Reviews fetched", {
      reviews,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return next(new AppError("Review not found", 404));

    const isOwner = review.user.toString() === req.user.id;

    if (!isOwner && req.user.role !== "admin") {
      return next(new AppError("Access denied", 403));
    }

    review.isDeleted = true;
    await review.save();

    return successResponse(res, "Review deleted");
  } catch (err) {
    next(err);
  }
};