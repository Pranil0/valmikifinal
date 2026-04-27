// backend/checkAdmin.js
import bcrypt from "bcrypt";
import sequelize from "./config/db.js";
import Admin from "./models/Admin.js";

const checkAdminPassword = async (emailToCheck, plainPassword) => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");

    // Find admin by email
    const admin = await Admin.findOne({ where: { email: emailToCheck } });
    if (!admin) {
      console.log(`❌ Admin with email "${emailToCheck}" not found`);
      process.exit(0);
    }

    // Compare password
    const match = await bcrypt.compare(plainPassword, admin.password);
    if (match) {
      console.log(`✅ Password is correct for admin "${admin.name}"`);
    } else {
      console.log(`❌ Password is INVALID for admin "${admin.name}"`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

// Replace these with the login info you are testing
const emailToCheck = "admin@test.com";
const passwordToCheck = "StrongPassword123";

checkAdminPassword(emailToCheck, passwordToCheck);