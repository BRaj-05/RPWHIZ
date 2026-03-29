import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);


// 🔥 AUTO SLUG (SAFE UNIQUE GENERATION)
categorySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // ensure unique slug
    while (await mongoose.models.Category.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});


// 🔥 INDEXES (NO DUPLICATION)

// for fast slug queries
// categorySchema.index({ slug: 1 });

// for hierarchy queries (parent-child)
categorySchema.index({ parent: 1 });

// for active categories filtering
categorySchema.index({ isActive: 1 });

// sorting optimization
categorySchema.index({ sortOrder: 1 });


export const Category = mongoose.model("Category", categorySchema);