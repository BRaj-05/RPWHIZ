import { Cart } from "../models/index.js";
import Product from "../models/Product.js";
import { AppError } from "../utils/AppError.js";
import { getIO } from "../sockets/socketManager.js";

export const cartService = {
  async getOrCreate(userId) {
    let cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name images price stock")
      .lean();

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
      return cart;
    }

    return cart;
  },

  async addItem(userId, productId, quantity = 1) {
    if (!productId) throw new AppError("Product ID required", 400);

    const product = await Product.findById(productId);
    if (!product || !product.isActive || product.isDeleted) {
      throw new AppError("Product not found", 404);
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const existing = cart.items.find(
      (i) => i.product.toString() === productId
    );

    const newQty = existing ? existing.quantity + quantity : quantity;

    if (product.stock < newQty) {
      throw new AppError("Stock limit exceeded", 400);
    }

    if (existing) {
      existing.quantity = newQty;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        image: product.thumbnail || product.images?.[0] || "",
        price: product.price,
        priceAtAdd: product.price,
        quantity,
      });
    }

    await cart.save();

    // 🔥 Socket update
    const io = getIO();
    if (io) {
      io.to(`user:${userId}`).emit("cart:updated", {
        itemCount: cart.items.length,
        updatedAt: Date.now(),
      });
    }

    return this.getOrCreate(userId);
  },

  async updateItem(userId, productId, quantity) {
    if (quantity < 1) throw new AppError("Invalid quantity", 400);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found", 404);

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) throw new AppError("Item not found", 404);

    const product = await Product.findById(productId);

    if (product.stock < quantity) {
      throw new AppError("Insufficient stock", 400);
    }

    item.quantity = quantity;
    await cart.save();

    return this.getOrCreate(userId);
  },

  async removeItem(userId, productId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();

    return this.getOrCreate(userId);
  },

  async clear(userId) {
    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );
  },
};