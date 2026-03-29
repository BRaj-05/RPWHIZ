// import admin from "firebase-admin";

// /* -------------------------------------------------------
//    FIREBASE ADMIN INIT
//    -------------------------------------------------------
//    This connects your Express backend to:
//    - Firestore
//    - Realtime Database
//    - Firebase Auth
// -------------------------------------------------------- */
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
// }

// export const db = admin.firestore();
// export const rtdb = admin.database();
// export const auth = admin.auth();
// export { admin };

// ============================================================
// 📁 server/config/firebase.js  — FIREBASE ADMIN (AUTH ONLY)
// ============================================================
// Firebase is used ONLY for authentication.
// All app data is stored in MongoDB.
// ============================================================
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // 🔥 ENV METHOD
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    // ✅ FIX PRIVATE KEY (MOST IMPORTANT)
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }

  } else {
    // 📁 FILE METHOD (fallback)
    serviceAccount = JSON.parse(
      readFileSync(join(__dirname, "../serviceAccountKey.json"), "utf8")
    );
  }

} catch (error) {
  console.error("❌ Firebase config error:", error.message);
  process.exit(1);
}

// ✅ INIT ONLY ONCE
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ EXPORTS
export const auth = admin.auth();
export default admin;