import { Wishlist, Product } from "../models/index.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/response.js";

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products", "name price thumbnail rating stock")
      .lean();

    if (!wishlist) wishlist = { products: [] };

    return successResponse(res, "Wishlist fetched", { wishlist });
  } catch (err) {
    next(err);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return next(new AppError("Product ID required", 400));
    }

    // ✅ check product exists
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      });

      return successResponse(res, "Added to wishlist", { added: true });
    }

    const exists = wishlist.products.some(
      (p) => p.toString() === productId
    );

    if (exists) {
      wishlist.products.pull(productId);
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    return successResponse(
      res,
      exists ? "Removed from wishlist" : "Added to wishlist",
      { added: !exists }
    );
  } catch (err) {
    next(err);
  }
};