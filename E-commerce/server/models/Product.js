import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    costPrice: {
      type: Number,
      select: false, // hidden from queries
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


// 🔥 SAFE UNIQUE SLUG GENERATION (VERY IMPORTANT)
productSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});


// 🔥 INDEXES (NO DUPLICATION)

// slug lookup
// productSchema.index({ slug: 1 });

// filtering
productSchema.index({ isActive: 1, isDeleted: 1 });
productSchema.index({ isFeatured: 1 });

// category filtering
// productSchema.index({ category: 1 });

// price sorting/filter
productSchema.index({ price: 1 });

// 🔍 text search
productSchema.index({ name: "text", description: "text" });


export default mongoose.model("Product", productSchema);