import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
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

    priceAtAdd: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);


// 🔥 INDEXES (NO DUPLICATION)
// cartSchema.index({ user: 1 });


// 🔥 VIRTUALS
cartSchema.virtual("total").get(function () {
  return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
});

cartSchema.virtual("itemCount").get(function () {
  return this.items.reduce((sum, i) => sum + i.quantity, 0);
});


// 🔥 SAFETY HOOK (OPTIONAL BUT VERY GOOD)
// Prevent invalid quantities
cartSchema.pre("save", function (next) {
  this.items = this.items.filter((item) => item.quantity > 0);
  next();
});


export const Cart = mongoose.model("Cart", cartSchema);