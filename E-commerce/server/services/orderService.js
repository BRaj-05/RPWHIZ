import { Order } from "../models/index.js";
import { cartService } from "./cartService.js";
import { productService } from "./productService.js";
import { AppError } from "../utils/AppError.js";
import { getIO } from "../sockets/socketManager.js";

// 🔥 CONFIG
const SHIPPING_FREE_THRESHOLD = 499;
const SHIPPING_COST = 49;
const TAX_RATE = 0.18;

// 🔥 HELPER
const calculateTotals = (items, discount = 0) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * TAX_RATE);

  const shippingCost =
    subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;

  const total = afterDiscount + tax + shippingCost;

  return { subtotal, tax, shippingCost, total };
};

// ✅ NAMED EXPORT (IMPORTANT)
export const orderService = {
  // ================= CREATE ORDER =================
  async createFromCart(userId, { shippingAddress, paymentMethod, couponCode } = {}) {
    const cart = await cartService.getOrCreate(userId);

    if (!cart.items || cart.items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    // 🔥 STOCK VALIDATION
    for (const item of cart.items) {
      await productService.decrementStock(
        item.product.toString(),
        item.quantity
      );
    }

    // 🎁 COUPON
    let discount = 0;
    if (couponCode?.toUpperCase() === "SHOPORA10") {
      const sub = cart.items.reduce(
        (s, i) => s + i.price * i.quantity,
        0
      );
      discount = Math.round(sub * 0.1);
    }

    const { subtotal, tax, shippingCost, total } =
      calculateTotals(cart.items, discount);

    const order = await Order.create({
      user: userId,

      items: cart.items.map((i) => ({
        product: i.product,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),

      shippingAddress,

      subtotal,
      discount,
      tax,
      shippingCost,
      total,

      couponCode: couponCode || null,
      couponDiscount: discount,

      paymentMethod,
      paymentStatus: "pending",

      status: "pending",
      statusHistory: [{ status: "pending", note: "Order placed" }],
    });

    // 🧹 CLEAR CART
    await cartService.clear(userId);

    // 🔥 SOCKET EVENTS
    const io = getIO();
    if (io) {
      io.to(`user:${userId}`).emit("order:created", {
        orderId: order._id,
        total: order.total,
        status: order.status,
      });

      io.to("admin:room").emit("notification:new", {
        type: "new_order",
        message: `New order — ₹${order.total}`,
        orderId: order._id,
      });
    }

    return order;
  },

  // ================= USER ORDERS =================
  async getUserOrders(userId, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find({ user: userId })
        .select("-statusHistory -paymentResponse")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      Order.countDocuments({ user: userId }),
    ]);

    return {
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  // ================= GET ONE =================
  async getById(orderId, userId, role) {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .lean();

    if (!order) throw new AppError("Order not found", 404);

    if (role !== "admin" && order.user._id.toString() !== userId) {
      throw new AppError("Access denied", 403);
    }

    return order;
  },

  // ================= UPDATE STATUS =================
  async updateStatus(orderId, status, note = "", adminId) {
    const order = await Order.findById(orderId);

    if (!order) throw new AppError("Order not found", 404);

    order.status = status;

    order.statusHistory.push({
      status,
      note,
      updatedBy: adminId,
      updatedAt: new Date(),
    });

    // 🔥 HANDLE CANCEL
    if (status === "cancelled") {
      order.isCancelled = true;
      order.cancelledAt = new Date();

      // 🔄 RESTOCK
      for (const item of order.items) {
        await productService.decrementStock(
          item.product.toString(),
          -item.quantity
        );
      }
    }

    await order.save();

    // 🔥 SOCKET UPDATE
    const io = getIO();
    if (io) {
      io.to(`user:${order.user.toString()}`).emit("order:updated", {
        orderId: order._id,
        status: order.status,
      });
    }

    return order;
  },

  // ================= ADMIN LIST =================
  async listAll({ page = 1, limit = 20, status, paymentStatus } = {}) {
    const query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      Order.countDocuments(query),
    ]);

    return {
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },
};