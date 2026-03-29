import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { userService } from "../services/userService.js";
import { successResponse } from "../utils/response.js";

const router = express.Router();

// USER PROFILE
router.get("/profile", protect, async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    return successResponse(res, "Profile fetched", { user });
  } catch (e) {
    next(e);
  }
});

router.patch("/profile", protect, async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    return successResponse(res, "Profile updated", { user });
  } catch (e) {
    next(e);
  }
});

// ADMIN
router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const result = await userService.listUsers(req.query);
    return successResponse(res, "Users fetched", result);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/role", protect, adminOnly, async (req, res, next) => {
  try {
    const user = await userService.setRole(req.params.id, req.body.role);
    return successResponse(res, "Role updated", { user });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    return successResponse(res, "User deleted");
  } catch (e) {
    next(e);
  }
});

export default router;