// import express from "express";
// import protect from "../middleware/verifyFirebaseToken.js";
// import {
//   addToCart,
//   clearCart,
//   getCart,
//   removeCartItem,
//   updateCartItem,
// } from "../controllers/cartController.js";

// const router = express.Router();

// router.get("/", protect, getCart);
// router.post("/add", protect, addToCart);
// router.patch("/:productId", protect, updateCartItem);
// router.delete("/:productId", protect, removeCartItem);
// router.delete("/", protect, clearCart);

// export default router;

import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.get("/", protect, getCart);

// RESTFUL
router.post("/", protect, addToCart);

router.patch("/:productId", protect, updateCartItem);

// IMPORTANT ORDER
router.delete("/", protect, clearCart);
router.delete("/:productId", protect, removeCartItem);

export default router;