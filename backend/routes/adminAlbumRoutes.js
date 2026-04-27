import express from "express";
import {
  createAlbum,
  getAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
} from "../controllers/albumController.js";

const router = express.Router();

router.post("/", createAlbum);
router.get("/", getAlbums);
router.get("/:slug", getAlbum);       // use slug
router.delete("/:slug", deleteAlbum); // use slug
router.put("/:slug", updateAlbum);    // use slug

export default router;