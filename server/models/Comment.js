const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comment extends Model {}

Comment.init(
  {
    uuid: {
      type: DataTypes.UUID,
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
    /*defaultScope: {
      attributes: { exclude: ["userId"] },
    },*/
  }
);

module.exports = Comment;
