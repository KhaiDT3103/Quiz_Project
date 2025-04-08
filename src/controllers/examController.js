const { SubSubject, User, Exam, ExamQuestion, Question, Answer } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");
const question = require("../models/question");
//Get All Exam by subjectID
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
//Get All Exam by subjectID with Question
exports.getAllExamsBySubjectIDWithQuestion = async (req, res) => {
    try {
        const { subsubject_id } = req.params;
        if (!subsubject_id) {
            return res.status(400).json({ message: "Thiếu mã môn học👹" });
        }

        const exams = await Exam.findAll({
            where: { subsubject_id }, // Lọc theo môn học
            include: [
                {
                    model: SubSubject,
                    as: "subsubject",
                    attributes: ["subsubjects_id", "subject_name"]
                },
                {
                    model: Question,
                    as: "question", // Lấy danh sách câu hỏi
                    through: { attributes: [] }, // Loại bỏ dữ liệu trung gian của bảng ExamQuestion
                    include: [
                        {
                            model: Answer, // Lấy danh sách câu trả lời
                            as: "answers",
                            attributes: ["answer_id", "answer_text", "is_correct"]
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]] // Sắp xếp theo thời gian mới nhất
        });

        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error });
    }
};

//Get All Exam by user_id
exports.getAllExamsByUserID = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "Thiếu mã người dùng👹" });
        }
        const exams = await Exam.findAll({
            where: { created_by: user_id }, // Điều kiện lọc
            include: [
                {
                    model: SubSubject,
                    as: "subsubject",
                    attributes: ["subsubjects_id", "subject_name"]
                },
                {
                    model: User,
                    as: "creator", // Đúng alias đã định nghĩa trong model
                    attributes: ["user_id", "username", "email"]
                },
                {
                    model: Question,
                    through: { attributes: [] }, // Không lấy dữ liệu từ bảng trung gian
                    include: [
                        {
                            model: Answer,
                            as: "answers",
                            attributes: ["answer_id", "answer_text", "is_correct"]
                        }
                    ]
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
            return res.status(400).json({ message: "Thiếu thông tin hoặc danh sách câu hỏi không hợp lệ👹" });
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

exports.deleteExamWithQuestions = async (req, res) => {
    try {
        const { exam_id } = req.params;

        if (!exam_id) {
            return res.status(400).json({ message: "Thiếu mã bài thi 👹", deleted: false });
        }

        // Xóa tất cả liên kết câu hỏi của exam trong bảng trung gian
        await ExamQuestion.destroy({
            where: { exam_id }
        });

        // Xóa bài thi
        const deleted = await Exam.destroy({
            where: { exam_id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài thi để xóa 👹", deleted: false });
        }

        res.json({ message: "Đã xóa bài thi 👹", deleted: true });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server 👹", error: error.message || error, deleted: false });
    }
};

