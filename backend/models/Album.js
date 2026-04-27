import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Album = sequelize.define("Album", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Album;