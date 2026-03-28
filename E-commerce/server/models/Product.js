import { db, admin } from "../config/firebase.js";

/* -------------------------------------------------------
   PRODUCT MODEL
   -------------------------------------------------------
   Collection: products/{productId}
-------------------------------------------------------- */

const productsRef = db.collection("products");

export const ProductModel = {
  async create(productData) {
    const docRef = await productsRef.add({
      ...productData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { id: docRef.id, ...productData };
  },

  async findAll() {
    const snapshot = await productsRef.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async findById(id) {
    const doc = await productsRef.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async update(id, data) {
    await productsRef.doc(id).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return this.findById(id);
  },

  async delete(id) {
    await productsRef.doc(id).delete();
    return true;
  },
};