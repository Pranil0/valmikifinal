import express from "express";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// ADMIN
router.post("/", protectAdmin, createEvent);
router.put("/:id", protectAdmin, updateEvent);
router.delete("/:id", protectAdmin, deleteEvent);

export default router;