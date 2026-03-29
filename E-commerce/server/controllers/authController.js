import User from "../models/User.js";
import { auth } from "../config/firebase.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/response.js";

// POST /api/v1/auth/login
export const loginOrRegister = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return next(new AppError("Unauthorized", 401));
    }

    const user = await User.findById(req.user.id)
      .select("-__v")
      .populate("defaultAddress")
      .lean();

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    return successResponse(res, "Login successful", { user });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/auth/me
export const getMe = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return next(new AppError("Unauthorized", 401));
    }

    const user = await User.findById(req.user.id)
      .select("-__v")
      .populate("defaultAddress")
      .lean();

    return successResponse(res, "Profile fetched", { user });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/auth/set-admin
export const setAdminRole = async (req, res, next) => {
  try {
    const { uid } = req.body;

    if (!uid) return next(new AppError("uid required", 400));

    await auth.setCustomUserClaims(uid, { admin: true });

    await User.findOneAndUpdate(
      { firebaseUid: uid },
      { role: "admin" },
      { new: true }
    );

    return successResponse(res, "Admin role granted");
  } catch (err) {
    next(err);
  }
};