const { SubSubject, User, Exam } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");
//Lấy tất cả môn học
exports.getAllExamsBySubjectID = async (req, res) => {
    try {
        const { subsubject_id } = req.params;
        if (!subsubject_id) {
            return res.status(400).json({ message: "Thiếu mã môn học👹" });
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
        res.status(500).json({ message: "Lỗi server👹", error });
    }
};

exports.createExam = async (req, res) => {
    try {
        const { title, description, created_by, subsubject_id } = req.body;
        if (!title || !description || !created_by || !subsubject_id) {
            return res.status(400).json({ message: "Thiếu thông tin" });
        }

        const newExam = await Exam.create({ title, description, created_by, subsubject_id });
        res.status(201).json({ message: "Bài thi đã được tạo👹", exam: newExam });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error });
    }
};
// try {

//         const { username, password, role } = req.body;
//         if (!username || !password || !role) {
//             return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
//         }
//         const createdAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
//         const updatedAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");

//         const newUser = await User.create({ username, password, role, createdAt, updatedAt });
//         res.status(201).json({ message: "Người dùng đã được tạo", user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: "Lỗi server", error });
//     }