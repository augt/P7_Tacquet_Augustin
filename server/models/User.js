const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      //primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: {
        msg: "Ce nom d'utilisateur est déjà utilisé.",
      },
      validate: {
        notEmpty: {
          msg: "Vous devez choisir un nom d'utilisateur.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Cette adresse email est déjà utilisée.",
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    /*defaultScope: {
      attributes: { exclude: ["password", "id", "isAdmin"] },
    },
    scopes: {
      fullData: {
        attributes: {},
      },
    },*/
  }
);

module.exports = User;
