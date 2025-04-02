const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const ExamQuestion = sequelize.define("ExamQuestion", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        exam_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
        question_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true }
    }, {
        tableName: "examquestion",
        timestamps: false
    });

    return ExamQuestion;
};