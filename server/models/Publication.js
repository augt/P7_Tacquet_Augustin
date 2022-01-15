const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Publication extends Model {}

Publication.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "publication",
  }
);

module.exports = Publication;
