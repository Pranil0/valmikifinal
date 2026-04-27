// routes/contactRoutes.js
import express from "express";
import {
  submitContact,
  getAllContacts,
  deleteContact,
  bulkDeleteContacts,
  markContactAsRead,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", getAllContacts);
router.patch("/bulk-read", markContactAsRead);  // ⚠️ must be BEFORE /:id
router.patch("/:id/read", markContactAsRead);
router.delete("/", bulkDeleteContacts);          // ⚠️ must be BEFORE /:id
router.delete("/:id", deleteContact);

export default router;