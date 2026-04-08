import express from "express";
import {
  loginOrRegister,
  getMe,
  setAdminRole,
} from "../controllers/authController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Firebase token → MongoDB user
router.post("/login", loginOrRegister);

router.get("/me", protect, getMe);

// Admin only
router.post("/set-admin", protect, adminOnly, setAdminRole);

export default router;