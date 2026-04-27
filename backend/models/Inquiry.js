import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // your Sequelize instance

const Inquiry = sequelize.define("Inquiry", {
  studentName: { type: DataTypes.STRING, allowNull: false },
  parentName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY },
  stream: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  read: { type: DataTypes.BOOLEAN, defaultValue: false }, // <- Add this
}, {
  timestamps: true,
});

export default Inquiry;