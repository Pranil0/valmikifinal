// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js"; // your db connection
import Admin from "./models/Admin.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import newsRoutes from "./routes/news.js";
import eventRoutes from "./routes/event.js";
import albumRoutes from "./routes/adminAlbumRoutes.js";
import photoRoutes from "./routes/adminPhotoRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json()); // for parsing JSON bodies
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/albums", albumRoutes);
app.use("/api/admin/photos", photoRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/contact", contactRoutes);

// --------------------
// Test route
// --------------------
app.get("/", (req, res) => {
  console.log("GET / route hit");
  res.send("Backend is working!");
});

// --------------------
// Database connection test
// --------------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully!");

    // ✅ CHANGE THIS LINE
    await sequelize.sync({ alter: true });

    console.log("✅ Tables synced!");
  } catch (error) {
    console.error("❌ DB Error:", error);
  }
})();

// --------------------
// Start server
// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --------------------
// Global error handlers (optional but recommended)
// --------------------
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});