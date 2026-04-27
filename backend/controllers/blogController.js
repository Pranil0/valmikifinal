import Blog from "../models/Blog.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// ================= CREATE BLOG =================
export const createBlog = async (req, res) => {
  try {
    const { title, desc, category, author, content } = req.body;

    let imageUrl = null;

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

      imageUrl = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.create({
      title,
      desc,
      category,
      author,
      content,
      imageUrl,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= GET ALL BLOGS =================
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// ================= GET SINGLE BLOG =================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// ================= UPDATE BLOG =================
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, desc, category, author, content } = req.body;
    let imageUrl = blog.imageUrl;

    if (req.file) {
      const filePath = req.file.path;
      const ext = path.extname(req.file.filename).toLowerCase();

      // ❗ Delete old image
      if (blog.imageUrl) {
        const oldPath = blog.imageUrl.replace("/uploads/", "uploads/");
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

      imageUrl = `/uploads/blogs/${req.file.filename}`;
    }

    await blog.update({
      title,
      desc,
      category,
      author,
      content,
      imageUrl,
    });

    res.json(blog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= DELETE BLOG =================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // ❗ Delete image file
    if (blog.imageUrl) {
      const filePath = blog.imageUrl.replace("/uploads/", "uploads/");
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await blog.destroy();

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};