const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize);
const Subject = require("./subject")(sequelize);
const SubSubject = require("./subsubject")(sequelize);
const Question = require("./question")(sequelize)
const db = { sequelize, User, Subject, SubSubject, Question };
module.exports = db;
