import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    line1: {
      type: String,
      required: true,
      trim: true,
    },

    line2: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // ✅ Indian pincode validation
    },

    country: {
      type: String,
      default: "India",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// 🔥 INDEXES (ONLY HERE — no duplication)

// Fast lookup for user addresses
addressSchema.index({ user: 1 });

// ✅ Only one default address per user
addressSchema.index(
  { user: 1, isDefault: 1 },
  {
    unique: true,
    partialFilterExpression: { isDefault: true },
  }
);

export const Address = mongoose.model("Address", addressSchema);