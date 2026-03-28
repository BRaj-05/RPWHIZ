import express from "express";
import protect from "../middleware/verifyFirebaseToken.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.patch("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeCartItem);
router.delete("/", protect, clearCart);

export default router;