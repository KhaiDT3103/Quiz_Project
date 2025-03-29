
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
            as: "answers" // Alias này phải khớp với `as` trong include
        });
    };
    return Question;
};