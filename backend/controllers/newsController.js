// controllers/newsController.js

import News from "../models/News.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// ================= CREATE NEWS =================
export const createNews = async (req, res) => {
  try {
    const { title, desc, category, author, date, content } = req.body;

    if (!title || !desc) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    let image = null;

    if (req.file) {
      const filePath = req.file.path;
      const ext = path.extname(req.file.filename).toLowerCase();

      const img = sharp(filePath).resize({
        width: 1200,
        height: 800,
        fit: "inside",
      });

      let buffer;

      if (ext === ".png") {
        buffer = await img.png({
          compressionLevel: 9,
          adaptiveFiltering: true,
        }).toBuffer();
      } else if (ext === ".jpg" || ext === ".jpeg") {
        buffer = await img.jpeg({ quality: 80 }).toBuffer();
      } else if (ext === ".webp") {
        buffer = await img.webp({ quality: 80 }).toBuffer();
      } else {
        buffer = await img.toBuffer();
      }

      fs.writeFileSync(filePath, buffer);

      image = `news/${req.file.filename}`;
    }

    const news = await News.create({
      title,
      desc,
      category,
      author,
      date,
      content,
      image,
    });

    res.status(201).json(news);
  } catch (err) {
    console.error("Error creating news:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= GET ALL NEWS =================
export const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= GET NEWS BY ID =================
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.status(200).json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= UPDATE NEWS =================
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, category, author, date, content } = req.body;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    if (req.file) {
      const filePath = req.file.path;
      const ext = path.extname(req.file.filename).toLowerCase();

      // ❗ Delete old image (FIXED PATH)
      if (news.image) {
        const oldPath = path.join("uploads", news.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const img = sharp(filePath).resize({
        width: 1200,
        height: 800,
        fit: "inside",
      });

      let buffer;

      if (ext === ".png") {
        buffer = await img.png({
          compressionLevel: 9,
          adaptiveFiltering: true,
        }).toBuffer();
      } else if (ext === ".jpg" || ext === ".jpeg") {
        buffer = await img.jpeg({ quality: 80 }).toBuffer();
      } else if (ext === ".webp") {
        buffer = await img.webp({ quality: 80 }).toBuffer();
      } else {
        buffer = await img.toBuffer();
      }

      fs.writeFileSync(filePath, buffer);

      news.image = `news/${req.file.filename}`;
    }

    // Update fields
    news.title = title || news.title;
    news.desc = desc || news.desc;
    news.category = category || news.category;
    news.author = author || news.author;
    news.date = date || news.date;
    news.content = content || news.content;

    await news.save();

    res.status(200).json(news);
  } catch (err) {
    console.error("Error updating news:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ================= DELETE NEWS =================
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    // 🔥 Delete image from server
    if (news.image) {
      const filePath = path.join("uploads", news.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await news.destroy();

    res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};