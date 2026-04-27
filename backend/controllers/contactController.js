// controllers/contactController.js
import Contact from "../models/Contact.js";
import { Op } from "sequelize"
export const submitContact = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, and Message are required.",
      });
    }

    const contact = await Contact.create({ fullName, email, phone, message });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
  order: [["createdAt", "DESC"]],
});

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};



// DELETE contact by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ... your existing functions stay unchanged ...

// Bulk delete
export const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    await Contact.destroy({ where: { id: { [Op.in]: ids } } });

    res.status(200).json({ success: true, message: "Contacts deleted successfully" });
  } catch (error) {
    console.error("Bulk delete contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark as read — handles single and bulk
export const markContactAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = req.body?.ids; // ✅ safe optional chaining

    const condition = id ? { id } : { id: { [Op.in]: ids } };

    await Contact.update({ read: true }, { where: condition });
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    console.error("Mark contact as read error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};