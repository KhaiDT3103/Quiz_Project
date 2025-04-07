const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const ExamHistories = sequelize.define("ExamHistories", {
        //subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        history_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        exam_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        score: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        started_at: { type: DataTypes.DATE, allowNull: false },
        finished_at: { type: DataTypes.DATE, allowNull: false },
        total_time: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    }, {
        tableName: "exam_histories",
        timestamps: true
    });
    ExamHistories.associate = (models) => {
        // Mối quan hệ với Exam
        ExamHistories.belongsTo(models.Exam, {
            foreignKey: "exam_id",
            as: "exam"
        });

        // Mối quan hệ với User
        ExamHistories.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        });
        ExamHistories.hasMany(models.ExamHistoryAns, {
            foreignKey: 'history_id',
            as: "examhisans"
        });
    };
    return ExamHistories;
};