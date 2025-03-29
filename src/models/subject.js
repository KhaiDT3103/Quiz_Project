
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Subject = sequelize.define("Subject", {
        subject_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, {
        tableName: "subjects",
        timestamps: false
    });
    Subject.associate = (models) => {
        Subject.hasMany(models.SubSubject, { foreignKey: "subject_id", as: "subsubjects" });
    };
    return Subject;
};