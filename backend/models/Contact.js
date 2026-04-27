// models/Contact.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Contact = sequelize.define("Contact", {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }, // <- Add this
});

export default Contact;