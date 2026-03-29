import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    helpfulVotes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);


// 🔥 INDEXES (NO DUPLICATION)

// one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// fast product reviews
reviewSchema.index({ product: 1, createdAt: -1 });

// user reviews
reviewSchema.index({ user: 1 });


// 🔥 AUTO UPDATE PRODUCT RATING (SAFE)

// on create/update
reviewSchema.post("save", async function () {
  await recalculateProductRating(this.product);
});

// on delete (soft delete case)
reviewSchema.post("findOneAndUpdate", async function (doc) {
  if (doc && doc.isDeleted) {
    await recalculateProductRating(doc.product);
  }
});

// on hard delete
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await recalculateProductRating(doc.product);
  }
});


// 🔥 RATING RECALCULATION (OPTIMIZED)
async function recalculateProductRating(productId) {
  const Review = mongoose.model("Review");
  const Product = mongoose.model("Product");

  const stats = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        isDeleted: false,
        isApproved: true,
      },
    },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].count,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
  }
}


export const Review = mongoose.model("Review", reviewSchema);