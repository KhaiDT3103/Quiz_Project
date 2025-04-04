const { SubSubject, User, Exam, ExamQuestion } = require("../models");
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
        const { title, description, time, created_by, subsubject_id, question_ids } = req.body;

        if (!title || !description || !time || !created_by || !subsubject_id || !Array.isArray(question_ids)) {
            return res.status(400).json({ message: "Thiếu thông tin hoặc danh sách câu hỏi không hợp lệ" });
        }

        // Tạo bài thi
        const newExam = await Exam.create({ title, description, time, created_by, subsubject_id });

        // Tạo danh sách bản ghi liên kết câu hỏi và bài thi
        const examQuestionData = question_ids.map(qid => ({
            exam_id: newExam.exam_id,
            question_id: qid
        }));

        // Thêm vào bảng examquestion
        await ExamQuestion.bulkCreate(examQuestionData);

        res.status(201).json({
            message: "Bài thi đã được tạo và gán câu hỏi thành công 👹",
            exam: newExam,
            totalQuestionsLinked: question_ids.length
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server 👹", error: error.message || error });
    }
};
