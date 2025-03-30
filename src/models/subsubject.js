const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const SubSubject = sequelize.define("SubSubject", {
        subsubjects_id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        subject_name: { type: DataTypes.STRING, allowNull: false, unique: true },
        subject_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    }, {
        tableName: "subsubjects",
        timestamps: false
    });
    SubSubject.associate = (models) => {
        SubSubject.belongsTo(models.Subject, { foreignKey: "subject_id", as: "subject" });
        SubSubject.hasMany(models.Exam, {
            foreignKey: "subsubject_id",
            as: "exams"
        });
    };
    return SubSubject;
};