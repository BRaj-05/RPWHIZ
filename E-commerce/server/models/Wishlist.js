import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one wishlist per user
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);


// 🔥 INDEXES (NO DUPLICATION)

// fast lookup for user wishlist
// wishlistSchema.index({ user: 1 });

// optional: optimize product existence queries (only if needed later)
wishlistSchema.index({ products: 1 });


// 🔥 PREVENT DUPLICATES IN ARRAY (VERY IMPORTANT)
wishlistSchema.pre("save", function (next) {
  this.products = [...new Set(this.products.map(p => p.toString()))];
  next();
});


export const Wishlist = mongoose.model("Wishlist", wishlistSchema);