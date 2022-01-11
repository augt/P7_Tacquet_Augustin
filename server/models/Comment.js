const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comment extends Model {}

Comment.init(
  {
    commenter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalPublication_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comment",
  }
);

module.exports = Comment;