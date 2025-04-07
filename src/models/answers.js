
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Answer = sequelize.define("Answer", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        answer_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        question_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        answer_text: { type: DataTypes.STRING, allowNull: false },
        is_correct: { type: DataTypes.TINYINT, allowNull: false }

    }, {
        tableName: "answers",
        timestamps: true
    });
    Answer.associate = (models) => {
        Answer.belongsTo(models.Question, {
            foreignKey: "question_id",
            as: "question"
        });
        Answer.hasMany(models.ExamHistoryAns, {
            foreignKey: 'selected_answer_id',
            as: "examhisans"
        });
    };
    return Answer;
};