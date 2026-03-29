// middleware/authMiddleware.js
import { auth } from "../config/firebase.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return next(new AppError("No token provided", 401));
    }

    const token = header.split(" ")[1];

    if (!token) {
      return next(new AppError("Invalid token format", 401));
    }

    const decoded = await auth.verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    // 🔥 CREATE USER IF FIRST LOGIN
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        name:
          decoded.name ||
          decoded.email?.split("@")[0] ||
          "User",
        avatar: decoded.picture || "",
        lastLogin: new Date(),
      });
    } else {
      // non-blocking update
      User.findByIdAndUpdate(user._id, {
        lastLogin: new Date(),
      }).exec();
    }

    if (!user.isActive) {
      return next(new AppError("Account suspended", 403));
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      firebaseUid: user.firebaseUid,
    };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

// 👑 ADMIN
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  next();
};

// ⚡ OPTIONAL
export const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) return next();

    const token = header.split(" ")[1];

    const decoded = await auth.verifyIdToken(token);

    const user = await User.findOne({
      firebaseUid: decoded.uid,
    }).lean();

    if (user && user.isActive) {
      req.user = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      };
    }
  } catch (_) {}

  next();
};