const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comment extends Model {}

Comment.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
