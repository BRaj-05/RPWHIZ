import { auth } from "../config/firebase.js";

/* -------------------------------------------------------
   FIREBASE AUTH MIDDLEWARE
   -------------------------------------------------------
   Frontend sends:
   Authorization: Bearer <Firebase ID Token>
-------------------------------------------------------- */
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const token = header.split(" ")[1];
    const decoded = await auth.verifyIdToken(token);

    req.user = {
      id: decoded.uid,
      email: decoded.email || "",
      role: decoded.role || (decoded.admin ? "admin" : "customer"),
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;