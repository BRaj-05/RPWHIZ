import mongoose from "mongoose";

/* -------------------------------------------------------
   CART ITEM SUB-SCHEMA
   -------------------------------------------------------
   Each cart item stores product data and quantity.
   We keep some product fields here so cart still works
   even if product data changes later.
-------------------------------------------------------- */
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
    },
    brand: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
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

/* -------------------------------------------------------
   CART SCHEMA
   -------------------------------------------------------
   One cart per user.
-------------------------------------------------------- */
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;