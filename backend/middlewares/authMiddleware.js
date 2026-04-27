// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Middleware to protect routes
export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin info to request
      const admin = await Admin.findByPk(decoded.id);
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      req.admin = admin;
      next(); // proceed to the route
    } else {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
