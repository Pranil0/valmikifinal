// backend/routes/adminRoutes.js
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --------------------
// Public routes
// --------------------
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);   // sends OTP via email
router.post("/reset-password", resetPassword);     // reset using OTP

// --------------------
// Protected routes (require JWT)
// --------------------
router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: `Welcome ${req.admin.name} to the admin dashboard!` });
});

// Change password for logged-in admin
router.post("/change-password", protectAdmin, changePassword);

// (Optional) Add more protected routes here later
// e.g., profile update, email change, etc.

export default router;