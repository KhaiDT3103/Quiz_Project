const { SubSubject, User, Exam } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");
//Lấy tất cả môn học
exports.getAllExamsBySubjectID = async (req, res) => {
    try {
        const { subsubject_id } = req.params;
        if (!subsubject_id) {
            return res.status(400).json({ message: "Thiếu mã môn học" });
        }
        const exams = await Exam.findAll({
            where: { subsubject_id }, // Điều kiện lọc
            include: [
                {
                    model: SubSubject,
                    as: "subsubject",
                    attributes: ["subsubjects_id", "subject_name"]
                }
            ],
            order: [["createdAt", "DESC"]] // Sắp xếp theo thời gian tạo mới nhất
        });

        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};