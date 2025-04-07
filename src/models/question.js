
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Question = sequelize.define("Question", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        question_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        subject_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
        question_text: { type: DataTypes.STRING, allowNull: false, unique: true },
        difficulty: { type: DataTypes.ENUM("easy", "medium", "hard"), allowNull: false },
        created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    }, {
        tableName: "questions",
        timestamps: true
    });
    Question.associate = (models) => {
        Question.hasMany(models.Answer, {
            foreignKey: "question_id",
            as: "answers",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Question.belongsToMany(models.Exam, {
            through: models.ExamQuestion,
            foreignKey: "question_id",
            otherKey: "exam_id"
        });
        Question.hasMany(models.ExamHistoryAns, {
            foreignKey: 'question_id',
            as: "examhisans"
        });
    };
    return Question;
};