import Album from "../models/Album.js";
import Photo from "../models/Photo.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";

// ================= CREATE ALBUM =================
export const createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Album name required" });

    const slug = slugify(name, { lower: true });
    const existing = await Album.findOne({ where: { slug } });
    if (existing) return res.status(400).json({ message: "Album already exists" });

    const albumPath = path.join("uploads", "gallery", slug);
    if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });

    const album = await Album.create({ name, slug });
    res.status(201).json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET ALL ALBUMS =================
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({ order: [["createdAt", "DESC"]] });
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET SINGLE ALBUM (BY SLUG) =================
export const getAlbum = async (req, res) => {
  try {
    const { slug } = req.params;

    const album = await Album.findOne({
      where: { slug },
      include: [{ model: Photo, as: "Photos" }],
    });

    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE ALBUM (BY SLUG) =================
 export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findOne({ where: { slug: req.params.slug } });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    const folderPath = path.join(process.cwd(), "uploads", "gallery", album.slug);



    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    await album.destroy();

    res.json({ message: "Album deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// ================= UPDATE ALBUM (BY SLUG) =================
export const updateAlbum = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Album name required" });

    const album = await Album.findOne({ where: { slug } });
    if (!album) return res.status(404).json({ message: "Album not found" });

    const newSlug = slugify(name, { lower: true });

    // ✅ Check if another album already has this slug (avoid collision)
    if (newSlug !== album.slug) {
      const conflict = await Album.findOne({ where: { slug: newSlug } });
      if (conflict) return res.status(400).json({ message: "An album with this name already exists" });
    }

    const oldFolderPath = path.join("uploads", "gallery", album.slug);
    const newFolderPath = path.join("uploads", "gallery", newSlug);

    // ✅ Rename the folder on disk so photos don't break
    if (album.slug !== newSlug) {
      if (fs.existsSync(oldFolderPath)) {
        fs.renameSync(oldFolderPath, newFolderPath);
      } else {
        // Folder didn't exist yet — create it fresh
        fs.mkdirSync(newFolderPath, { recursive: true });
      }
    }

    // ✅ Now safe to update the slug in DB
    album.name = name;
    album.slug = newSlug;
    await album.save();

    const updatedAlbum = await Album.findOne({
      where: { id: album.id },
      include: [{ model: Photo, as: "Photos" }],
    });

    res.json(updatedAlbum);
  } catch (err) {
    console.error("UPDATE ALBUM ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};