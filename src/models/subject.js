console.log("⚡ Đang chạy models/subject.js...");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Subject = sequelize.define("Subject", {
        subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        tableName: "subjects",
        timestamps: false
    });
    return Subject;
};