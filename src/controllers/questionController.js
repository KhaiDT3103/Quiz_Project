const { User, SubSubject, Question } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");
//Lấy câu hỏi theo môn học tăng dần theo độ khó
exports.getAllQuestionBySubjectID = async (req, res) => {
    try {
        const { subject_id } = req.params;

        const subjectExists = await SubSubject.findByPk(subject_id);
        if (!subjectExists) {
            return res.status(404).json({ message: "Không tìm thấy môn học" });
        }

        // Lấy danh sách các câu hỏi thuộc môn học này
        const questions = await Question.findAll({
            where: { subject_id },
            order: [
                [Sequelize.literal("FIELD(difficulty, 'easy', 'medium', 'hard')")]
            ]
        });

        res.json({ subject: subjectExists.name, questions });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
};

//Thêm câu hỏi
exports.createQuestion = async (req, res) => {
    try {
        const { subject_id, question_text, difficulty, created_by } = req.body;
        if (!subject_id || !question_text || !difficulty || !created_by) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }
        const subjectExists = await SubSubject.findByPk(subject_id);
        if (!subjectExists) {
            return res.status(404).json({ message: "Không tìm thấy môn học" });
        }
        const userExists = await User.findByPk(created_by);
        if (!userExists) {
            return res.status(404).json({ message: "Không tồn tại user này" });
        }
        const createdAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        const updatedAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        const newQuestion = await Question.create({ subject_id, question_text, difficulty, created_by, createdAt, updatedAt });
        res.status(201).json({ message: "Câu hỏi đã được thêm" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

//Xoá câu hỏi
