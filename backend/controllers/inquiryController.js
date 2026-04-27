import Inquiry from "../models/Inquiry.js";
import { Op } from "sequelize";
export const createInquiry = async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      email,
      phone,
      dob,
      stream,
      message,
    } = req.body;

    // Basic validation
    if (!studentName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const inquiry = await Inquiry.create({
      studentName,
      parentName,
      email,
      phone,
      dob,
      stream,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry,
    });
  } catch (error) {
    console.error("Inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// GET all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, inquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE inquiry by ID
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inquiry.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete inquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ... your existing functions stay unchanged ...

// Bulk delete
export const bulkDeleteInquiries = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    await Inquiry.destroy({ where: { id: { [Op.in]: ids } } });

    res.status(200).json({ success: true, message: "Inquiries deleted successfully" });
  } catch (error) {
    console.error("Bulk delete inquiry error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark as read — handles single (id in params) and bulk (ids in body)
export const markInquiryAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = req.body?.ids; // ✅ safe optional chaining

    const condition = id ? { id } : { id: { [Op.in]: ids } };

    await Inquiry.update({ read: true }, { where: condition });
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};