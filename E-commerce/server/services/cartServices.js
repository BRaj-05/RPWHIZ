import { db, admin, rtdb } from "../config/firebase.js";

/* -------------------------------------------------------
   CART SERVICE
   -------------------------------------------------------
   Each user has one cart document:
   carts/{uid}
-------------------------------------------------------- */
const cartDocRef = (userId) => db.collection("carts").doc(userId);

const getOrCreateCart = async (userId) => {
  const ref = cartDocRef(userId);
  const snap = await ref.get();

  if (!snap.exists) {
    const initialCart = {
      userId,
      items: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await ref.set(initialCart);
    return initialCart;
  }

  return snap.data();
};

const syncCartRealtime = async (userId, cart) => {
  // Optional live sync for UI previews / multiple tabs
  await rtdb.ref(`cartSync/${userId}`).set({
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    updatedAt: Date.now(),
  });
};

export const cartService = {
  getOrCreateCart,
  syncCartRealtime,
  cartDocRef,
};