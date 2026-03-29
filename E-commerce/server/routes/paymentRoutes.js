import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { successResponse } from "../utils/response.js";

const router = express.Router();

// 🔹 Stripe Intent
router.post("/create-intent", protect, async (req, res, next) => {
  try {
    // TODO: integrate Stripe
    return successResponse(res, "Payment intent created (TODO)", {
      clientSecret: "pi_xxx_secret_xxx",
    });
  } catch (e) {
    next(e);
  }
});

// 🔹 Stripe Webhook (RAW BODY REQUIRED)
router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // TODO: verify webhook signature
    return res.json({ received: true });
  }
);

// 🔹 Razorpay Order
router.post("/razorpay/create", protect, async (req, res, next) => {
  try {
    // TODO: Razorpay integration
    return successResponse(res, "Razorpay order created (TODO)", {
      orderId: "order_xxx",
    });
  } catch (e) {
    next(e);
  }
});

// 🔹 Razorpay Verify
router.post("/razorpay/verify", protect, async (req, res, next) => {
  try {
    // TODO: verify signature
    return successResponse(res, "Payment verified (TODO)");
  } catch (e) {
    next(e);
  }
});

export default router;