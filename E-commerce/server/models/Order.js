import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 snapshot items (correct design)
    items: {
      type: [orderItemSchema],
      required: true,
    },

    // 🔥 snapshot address (important)
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    // 💰 pricing
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 }, // 🔥 added GST support
    total: { type: Number, required: true },

    // 🎟 coupon
    couponCode: { type: String, default: null },
    couponDiscount: { type: Number, default: 0 },

    // 💳 payment
    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentId: { type: String, default: null },       // gateway id
    paymentResponse: { type: Object, default: null }, // raw response

    // 📦 order lifecycle
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    // 🧠 audit trail (VERY IMPORTANT)
    statusHistory: [
      {
        status: String,
        note: { type: String, default: "" },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        updatedAt: { type: Date, default: Date.now },
      },
    ],

    // 🚚 tracking
    trackingNumber: { type: String, default: null },
    trackingUrl: { type: String, default: null },

    // ❌ cancellation
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date, default: null },
    cancelReason: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);


// 🔥 INDEXES (NO DUPLICATION)

// fast user orders
orderSchema.index({ user: 1, createdAt: -1 });

// admin filtering
orderSchema.index({ status: 1, createdAt: -1 });

// payment tracking
orderSchema.index({ paymentStatus: 1 });


export const Order = mongoose.model("Order", orderSchema);