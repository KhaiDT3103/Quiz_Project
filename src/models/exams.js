const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Exam = sequelize.define("Exam", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        exam_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        time: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        subsubject_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    }, {
        tableName: "exams",
        timestamps: true
    });
    Exam.associate = (models) => {
        Exam.belongsTo(models.SubSubject, {
            foreignKey: "subsubject_id",
            as: "subsubject",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        Exam.belongsToMany(models.Question, {
            through: models.ExamQuestion,
            foreignKey: "exam_id",
            otherKey: "question_id"
        });
    };
    return Exam;
};