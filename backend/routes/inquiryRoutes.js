// routes/inquiryRoutes.js
import express from "express";
import {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
  bulkDeleteInquiries,
  markInquiryAsRead,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", getAllInquiries);
router.patch("/bulk-read", markInquiryAsRead);  // ⚠️ must be BEFORE /:id
router.patch("/:id/read", markInquiryAsRead);
router.delete("/", bulkDeleteInquiries);         // ⚠️ must be BEFORE /:id
router.delete("/:id", deleteInquiry);

export default router;