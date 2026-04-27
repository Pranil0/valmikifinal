import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Album from "./Album.js";

const Photo = sequelize.define("Photo", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  albumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Album,
      key: "id",
    },
  },
});

// Associations
Album.hasMany(Photo, { foreignKey: "albumId", onDelete: "CASCADE" });
Photo.belongsTo(Album, { foreignKey: "albumId" });

export default Photo;