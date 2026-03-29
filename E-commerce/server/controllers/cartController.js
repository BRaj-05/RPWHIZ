// import { db, admin } from "../config/firebase.js";
// import { cartService } from "../services/cartService.js";

// /* -------------------------------------------------------
//    CART CONTROLLERS
//    -------------------------------------------------------
//    Frontend can call these endpoints:
//    - GET    /api/cart
//    - POST   /api/cart/add
//    - PATCH  /api/cart/:productId
//    - DELETE /api/cart/:productId
//    - DELETE /api/cart
// -------------------------------------------------------- */

// export const getCart = async (req, res) => {
//   try {
//     const cart = await cartService.getOrCreateCart(req.user.id);

//     return res.json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch cart",
//     });
//   }
// };

// export const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;

//     if (!productId) {
//       return res.status(400).json({
//         success: false,
//         message: "productId is required",
//       });
//     }

//     const productSnap = await db.collection("products").doc(productId).get();

//     if (!productSnap.exists) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     const product = productSnap.data();
//     const ref = cartService.cartDocRef(req.user.id);

//     await db.runTransaction(async (tx) => {
//       const cartSnap = await tx.get(ref);

//       const cart = cartSnap.exists
//         ? cartSnap.data()
//         : {
//             userId: req.user.id,
//             items: [],
//           };

//       const items = cart.items || [];
//       const existingIndex = items.findIndex((i) => i.productId === productId);

//       if (existingIndex >= 0) {
//         items[existingIndex].quantity += Number(quantity);
//       } else {
//         items.push({
//           productId,
//           name: product.name || "",
//           brand: product.brand || "",
//           image: product.image || "",
//           price: Number(product.price || 0),
//           quantity: Number(quantity),
//         });
//       }

//       tx.set(
//         ref,
//         {
//           userId: req.user.id,
//           items,
//           updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//           createdAt:
//             cart.createdAt || admin.firestore.FieldValue.serverTimestamp(),
//         },
//         { merge: true }
//       );
//     });

//     const updatedCart = await cartService.getOrCreateCart(req.user.id);
//     await cartService.syncCartRealtime(req.user.id, updatedCart);

//     return res.json({
//       success: true,
//       message: "Added to cart",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to add item to cart",
//     });
//   }
// };

// export const updateCartItem = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { quantity } = req.body;

//     if (!quantity || quantity < 1) {
//       return res.status(400).json({
//         success: false,
//         message: "Quantity must be at least 1",
//       });
//     }

//     const ref = cartService.cartDocRef(req.user.id);
//     const snap = await ref.get();

//     if (!snap.exists) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const cart = snap.data();
//     const items = cart.items || [];
//     const itemIndex = items.findIndex((i) => i.productId === productId);

//     if (itemIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found in cart",
//       });
//     }

//     items[itemIndex].quantity = Number(quantity);

//     await ref.set(
//       {
//         items,
//         updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//       },
//       { merge: true }
//     );

//     const updatedCart = await cartService.getOrCreateCart(req.user.id);
//     await cartService.syncCartRealtime(req.user.id, updatedCart);

//     return res.json({
//       success: true,
//       message: "Cart updated",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update cart item",
//     });
//   }
// };

// export const removeCartItem = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const ref = cartService.cartDocRef(req.user.id);
//     const snap = await ref.get();

//     if (!snap.exists) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const cart = snap.data();
//     const items = (cart.items || []).filter((i) => i.productId !== productId);

//     await ref.set(
//       {
//         items,
//         updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//       },
//       { merge: true }
//     );

//     const updatedCart = await cartService.getOrCreateCart(req.user.id);
//     await cartService.syncCartRealtime(req.user.id, updatedCart);

//     return res.json({
//       success: true,
//       message: "Item removed from cart",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to remove item",
//     });
//   }
// };

// export const clearCart = async (req, res) => {
//   try {
//     const ref = cartService.cartDocRef(req.user.id);

//     await ref.set(
//       {
//         items: [],
//         updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//       },
//       { merge: true }
//     );

//     const updatedCart = await cartService.getOrCreateCart(req.user.id);
//     await cartService.syncCartRealtime(req.user.id, updatedCart);

//     return res.json({
//       success: true,
//       message: "Cart cleared",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to clear cart",
//     });
//   }
// };

import { cartService } from "../services/index.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../utils/AppError.js";

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getOrCreate(req.user.id);
    return successResponse(res, "Cart fetched", { cart });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return next(new AppError("productId is required", 400));
    }

    const cart = await cartService.addItem(
      req.user.id,
      productId,
      Number(quantity)
    );

    return successResponse(res, "Added to cart", { cart });
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return next(new AppError("Quantity must be ≥ 1", 400));
    }

    const cart = await cartService.updateItem(
      req.user.id,
      productId,
      Number(quantity)
    );

    return successResponse(res, "Cart updated", { cart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(
      req.user.id,
      req.params.productId
    );

    return successResponse(res, "Item removed", { cart });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await cartService.clear(req.user.id);
    return successResponse(res, "Cart cleared");
  } catch (err) {
    next(err);
  }
};