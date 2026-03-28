import { db, admin } from "../config/firebase.js";

/* -------------------------------------------------------
   USER MODEL (FIRESTORE)
   -------------------------------------------------------
   Collection: users/{uid}
-------------------------------------------------------- */

const usersRef = db.collection("users");

export const UserModel = {
  async create(userData) {
    const { uid, email, role = "customer" } = userData;

    const user = {
      uid,
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await usersRef.doc(uid).set(user);
    return user;
  },

  async findById(uid) {
    const doc = await usersRef.doc(uid).get();
    return doc.exists ? doc.data() : null;
  },

  async update(uid, data) {
    await usersRef.doc(uid).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return this.findById(uid);
  },
};