import { DataTypes } from "sequelize";
import db from "../config/db.js"; // your Sequelize instance

const News = db.define("news", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "News",
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // store file path or URL
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT, // for rich text (HTML)
    allowNull: true,
  },
});

export default News;