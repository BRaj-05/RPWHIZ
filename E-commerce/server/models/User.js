import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true, // ✅ keep this
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, // ✅ keep this
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true, // ✅ keep this
    },

    defaultAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true, // ✅ useful
    },

    wishlistCount: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ❌ REMOVE THESE (IMPORTANT)
// userSchema.index({ email: 1 });
// userSchema.index({ firebaseUid: 1 });
// userSchema.index({ role: 1 });

// ✅ Clean JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model("User", userSchema);