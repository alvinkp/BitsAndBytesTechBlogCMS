const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    blogId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

module.exports = Blog;
