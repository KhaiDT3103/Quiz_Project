const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");


const User = require("./user")(sequelize);
const Subject = require("./subject")(sequelize);
const SubSubject = require("./subsubject")(sequelize);
const Question = require("./question")(sequelize);
const Answer = require("./answers")(sequelize);
const Exam = require("./exams")(sequelize);
const ExamHistories = require("./exam_histories")(sequelize);
const ExamQuestion = require("./examquestion")(sequelize);
const ExamHistoryAns = require("./exam_history_answers")(sequelize);
const db = { sequelize, User, Subject, SubSubject, Question, Answer, Exam, ExamHistories, ExamHistoryAns, ExamQuestion };
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
module.exports = db;
