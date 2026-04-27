import express from "express";
import { setCoverPhoto } from "../controllers/photoController.js";
import { upload, uploadPhotos, deletePhoto } from "../controllers/photoController.js";

const router = express.Router();

// Upload photos to an album (use slug now)
router.post("/:albumSlug", upload.array("photos", 20), uploadPhotos);

// Delete single photo by ID
router.delete("/:id", deletePhoto);

// to set cover photo
router.put("/:photoId/set-cover", setCoverPhoto);
export default router;