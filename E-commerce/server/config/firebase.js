import admin from "firebase-admin";

/* -------------------------------------------------------
   FIREBASE ADMIN INIT
   -------------------------------------------------------
   This connects your Express backend to:
   - Firestore
   - Realtime Database
   - Firebase Auth
-------------------------------------------------------- */
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const db = admin.firestore();
export const rtdb = admin.database();
export const auth = admin.auth();
export { admin };