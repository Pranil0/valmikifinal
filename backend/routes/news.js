// routes/news.js
import express from "express";
import multer from "multer";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

// -------------------- MULTER CONFIG --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/news"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// -------------------- PUBLIC ROUTES --------------------
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// -------------------- ADMIN ROUTES --------------------
router.post("/", protectAdmin, upload.single("image"), createNews);
router.put("/:id", protectAdmin, upload.single("image"), updateNews);
router.delete("/:id", protectAdmin, deleteNews);

export default router;