import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

// ✅ NAMED EXPORT (IMPORTANT)
export const userService = {
  // ================= GET PROFILE =================
  async getProfile(userId) {
    const user = await User.findById(userId)
      .select("-__v")
      .populate("defaultAddress")
      .lean();

    if (!user) throw new AppError("User not found", 404);

    return user;
  },

  // ================= UPDATE PROFILE =================
  async updateProfile(userId, data) {
    const allowedFields = ["name", "phone", "avatar"];

    const updateData = {};

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updateData[key] = data[key];
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    )
      .select("-__v")
      .lean();

    if (!user) throw new AppError("User not found", 404);

    return user;
  },

  // ================= LIST USERS (ADMIN) =================
  async listUsers({ page = 1, limit = 20, role, search } = {}) {
    const query = {};

    if (role) query.role = role;

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select("-__v")
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      User.countDocuments(query),
    ]);

    return {
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  // ================= SET ROLE =================
  async setRole(userId, role) {
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).lean();

    if (!user) throw new AppError("User not found", 404);

    return user;
  },

  // ================= DELETE USER =================
  async deleteUser(userId) {
    await User.findByIdAndUpdate(userId, {
      isDeleted: true,
      isActive: false,
    });
  },
};