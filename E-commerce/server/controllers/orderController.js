import { db, admin, rtdb } from "../config/firebase.js";
import { cartService } from "../services/cartService.js";

/* -------------------------------------------------------
   ORDER CONTROLLERS
   -------------------------------------------------------
   This covers checkout / order creation.
-------------------------------------------------------- */
const calculateTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "cod" } = req.body;

    const cart = await cartService.getOrCreateCart(req.user.id);
    const items = cart.items || [];

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const { subtotal, shipping, total } = calculateTotals(items);

    const orderData = {
      userId: req.user.id,
      userEmail: req.user.email || "",
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      shippingAddress: shippingAddress || {},
      status: paymentMethod === "cod" ? "Pending" : "Paid",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const orderRef = await db.collection("orders").add(orderData);

    // clear cart after successful checkout
    await db.collection("carts").doc(req.user.id).set(
      {
        items: [],
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // realtime update for user/admin listeners
    await rtdb.ref(`orders/${orderRef.id}`).set({
      orderId: orderRef.id,
      userId: req.user.id,
      status: orderData.status,
      total: orderData.total,
      updatedAt: Date.now(),
    });

    const createdOrderSnap = await orderRef.get();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        id: orderRef.id,
        ...createdOrderSnap.data(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .where("userId", "==", req.user.id)
      .orderBy("createdAt", "desc")
      .get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const doc = await db.collection("orders").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const order = doc.data();

    if (order.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.json({
      success: true,
      order: {
        id: doc.id,
        ...order,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};