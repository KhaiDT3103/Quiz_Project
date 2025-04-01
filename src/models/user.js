
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        user_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true },
        role: { type: DataTypes.ENUM("student", "teacher", "admin"), allowNull: false, defaultValue: "student" },
    }, {
        tableName: "users",
        timestamps: true
    });

    return User;
};
