const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Publication extends Model {}

Publication.init(
  {
    uuid: {
      type: DataTypes.UUID,
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
    /*defaultScope: {
      attributes: { exclude: ["userId"] },
    },*/
  }
);

module.exports = Publication;
