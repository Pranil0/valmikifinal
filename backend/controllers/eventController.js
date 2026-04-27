import Event from "../models/Events.js";
import { Op } from "sequelize";

// ✅ Convert local datetime (from form) → UTC for DB
const toUTC = (localTime) => new Date(localTime).toISOString();

// ================= CREATE EVENT =================
export const createEvent = async (req, res) => {
  try {
    const { title, description, startDateTime, endDateTime, location, category } = req.body;

    if (!title || !description || !startDateTime || !endDateTime) {
      return res.status(400).json({
        message: "Title, description, start and end datetime are required",
      });
    }

    // ✅ Validation: end must be after start
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      return res.status(400).json({
        message: "End date/time must be after start date/time",
      });
    }

    const event = await Event.create({
      title,
      description,
      startDateTime: toUTC(startDateTime), // ✅ FIXED
      endDateTime: toUTC(endDateTime),     // ✅ FIXED
      location,
      category,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL (ONLY ACTIVE EVENTS) =================
export const getAllEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.findAll({
      where: {
        endDateTime: {
          [Op.gte]: now, // ✅ Only ongoing/future events
        },
      },
      order: [["startDateTime", "ASC"]],
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("Fetch Events Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE EVENT =================
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Fetch Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE EVENT =================
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { title, description, startDateTime, endDateTime, location, category } = req.body;

    // ✅ Validation if both provided
    if (startDateTime && endDateTime) {
      if (new Date(endDateTime) <= new Date(startDateTime)) {
        return res.status(400).json({
          message: "End date/time must be after start date/time",
        });
      }
    }

    event.title = title || event.title;
    event.description = description || event.description;

    // ✅ Convert to UTC only if updated
    event.startDateTime = startDateTime
      ? toUTC(startDateTime)
      : event.startDateTime;

    event.endDateTime = endDateTime
      ? toUTC(endDateTime)
      : event.endDateTime;

    event.location = location || event.location;
    event.category = category || event.category;

    await event.save();

    res.status(200).json(event);
  } catch (err) {
    console.error("Update Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE EVENT =================
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete Event Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};