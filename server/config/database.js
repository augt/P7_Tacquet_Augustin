const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("p7Groupomania", "Augustin Tacquet", "Pass2022+test", {
  dialect: "sqlite",
  host: "./server/config/dbFile.sqlite",
});

module.exports = sequelize;
