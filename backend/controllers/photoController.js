import Photo from "../models/Photo.js";
import Album from "../models/Album.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { albumSlug } = req.params;

      if (!albumSlug) {
        return cb(new Error("Album slug missing"), null);
      }

      const album = await Album.findOne({
        where: { slug: albumSlug },
      });

      if (!album) {
        return cb(new Error("Album not found"), null);
      }

      const folder = path.join(process.cwd(), "uploads", "gallery", album.slug);

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }

      cb(null, folder);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
});

// ================= UPLOAD PHOTOS =================
export const uploadPhotos = async (req, res) => {
  try {
    const { albumSlug } = req.params;

    if (!albumSlug) {
      return res.status(400).json({ message: "Album slug missing" });
    }

    const album = await Album.findOne({ where: { slug: albumSlug } });
    if (!album) return res.status(404).json({ message: "Album not found" });

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedPhotos = [];

    for (const file of files) {
      const filePath = file.path;
      const ext = path.extname(file.filename).toLowerCase();

      const image = sharp(filePath).resize({ width: 1200, height: 800, fit: "inside" });

      if (ext === ".png") {
        await image
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toBuffer()
          .then((data) => fs.writeFileSync(filePath, data));
      } else if (ext === ".jpg" || ext === ".jpeg") {
        await image
          .jpeg({ quality: 80 })
          .toBuffer()
          .then((data) => fs.writeFileSync(filePath, data));
      } else if (ext === ".webp") {
        await image
          .webp({ quality: 80 })
          .toBuffer()
          .then((data) => fs.writeFileSync(filePath, data));
      } else {
        await image.toBuffer().then((data) => fs.writeFileSync(filePath, data));
      }

      const photo = await Photo.create({
        filename: file.filename,
        albumId: album.id,
      });

      savedPhotos.push(photo);
    }

    // ✅ Set first uploaded photo as cover if not already set
    if (!album.coverImage && savedPhotos.length > 0) {
      album.coverImage = savedPhotos[0].filename;
      await album.save();
    }

    res.status(201).json(savedPhotos);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE PHOTO =================
export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await Photo.findByPk(id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const album = await Album.findByPk(photo.albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    // ✅ Use process.cwd() for reliable absolute path
    const filePath = path.join(process.cwd(), "uploads", "gallery", album.slug, photo.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await photo.destroy();

    // ✅ If deleted photo was the cover, auto-assign the next available photo
    if (album.coverImage === photo.filename) {
      const nextPhoto = await Photo.findOne({
        where: { albumId: album.id },
        order: [["createdAt", "ASC"]],
      });

      album.coverImage = nextPhoto ? nextPhoto.filename : null;
      await album.save();
    }

    // ✅ Return new coverImage so frontend syncs without a second API call
    res.json({ message: "Photo deleted successfully", coverImage: album.coverImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= SET COVER PHOTO =================
export const setCoverPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await Photo.findByPk(photoId);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const album = await Album.findByPk(photo.albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });

    album.coverImage = photo.filename;
    await album.save();

    res.json({ message: "Cover photo set successfully", album });
  } catch (err) {
    console.error("Set Cover Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};