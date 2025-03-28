const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize);
const Subject = require("./subject")(sequelize);
const db = { sequelize, User, Subject };
module.exports = db;
