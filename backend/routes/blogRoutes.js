import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import upload from "../middlewares/uploadMiddleware.js";
import { protectAdmin } from "../middlewares/authMiddleware.js"; // ✅ FIXED

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// ADMIN ROUTES
router.post("/", protectAdmin, upload.single("image"), createBlog);
router.put("/:id", protectAdmin, upload.single("image"), updateBlog);
router.delete("/:id", protectAdmin, deleteBlog);

export default router;