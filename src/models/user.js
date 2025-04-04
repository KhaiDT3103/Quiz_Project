
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        user_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        role: { type: DataTypes.ENUM("student", "teacher", "admin"), allowNull: false, defaultValue: "student" },
    }, {
        tableName: "users",
        timestamps: true
    });
    User.associate = (models) => {
        // Một user có thể tạo nhiều bài thi
        User.hasMany(models.Exam, {
            foreignKey: "created_by", // Khóa ngoại trỏ về Exam
            as: "exams",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    };

    return User;
};
