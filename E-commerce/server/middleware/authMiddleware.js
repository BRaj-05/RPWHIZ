import { auth } from "../config/firebase.js";

/* -------------------------------------------------------
   AUTH MIDDLEWARE (Firebase)
   -------------------------------------------------------
   Replaces JWT authentication
-------------------------------------------------------- */

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = header.split(" ")[1];

    const decoded = await auth.verifyIdToken(token);

    req.user = {
      id: decoded.uid,
      email: decoded.email,
      role: decoded.admin ? "admin" : "customer",
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protect;