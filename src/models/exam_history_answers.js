const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const ExamHistoryAns = sequelize.define("ExamHistoryAns", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        history_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        question_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        selected_answer_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        is_correct: { type: DataTypes.TINYINT, allowNull: false }
    }, {
        tableName: "exam_history_answers",
        timestamps: false
    });
    ExamHistoryAns.associate = (models) => {
        // Quan hệ với bảng ExamHistories
        ExamHistoryAns.belongsTo(models.ExamHistories, {
            foreignKey: 'history_id',
            targetKey: 'history_id',
            onDelete: 'CASCADE'
        });

        // Quan hệ với bảng Questions
        ExamHistoryAns.belongsTo(models.Question, {
            foreignKey: 'question_id',
            targetKey: 'question_id',
            as: "question",
            onDelete: 'CASCADE'
        });

        // Quan hệ với bảng Answers
        ExamHistoryAns.belongsTo(models.Answer, {
            foreignKey: 'selected_answer_id',
            targetKey: 'answer_id',
            as: "selectedAnswer",
            onDelete: 'SET NULL'
        });
    };
    return ExamHistoryAns;
};