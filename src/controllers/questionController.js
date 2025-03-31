const { User, SubSubject, Question, Answer } = require("../models");
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
            include: [{
                model: Answer,
                as: "answers",
                attributes: ["answer_id", "answer_text", "is_correct"],
            }],
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

//Thêm câu hỏi kèm câu trả lời
exports.createQuestion = async (req, res) => {
    try {
        const { subject_id, question_text, difficulty, created_by, answers } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!subject_id || !question_text || !difficulty || !created_by || !answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin, bao gồm danh sách câu trả lời" });
        }

        // Kiểm tra xem môn học có tồn tại không
        const subjectExists = await SubSubject.findByPk(subject_id);
        if (!subjectExists) {
            return res.status(404).json({ message: "Không tìm thấy môn học" });
        }

        // Kiểm tra xem user có tồn tại không
        const userExists = await User.findByPk(created_by);
        if (!userExists) {
            return res.status(404).json({ message: "Không tồn tại user này" });
        }

        // Lấy thời gian hiện tại
        const createdAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        const updatedAt = createdAt;

        // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
        const newQuestion = await Question.create(
            { subject_id, question_text, difficulty, created_by, createdAt, updatedAt },
            { returning: true }
        );

        // Lấy ID của câu hỏi mới
        const question_id = newQuestion.question_id;

        // Thêm các câu trả lời
        const answersData = answers.map(answer => ({
            question_id,
            answer_text: answer.answer_text,
            is_correct: answer.is_correct ? 1 : 0
        }));

        // Lưu câu trả lời vào database
        await Answer.bulkCreate(answersData);

        // Trả về kết quả
        res.status(201).json({
            message: "Câu hỏi và câu trả lời đã được thêm thành công",
            question: newQuestion,
            answers: answersData
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
};
//Xoá câu hỏi
exports.deleteQuestion = async (req, res) => {
    try {
        const { question_id } = req.params;

        // Kiểm tra xem câu hỏi có tồn tại không
        const question = await Question.findByPk(question_id);
        if (!question) {
            return res.status(404).json({ message: "Không tìm thấy câu hỏi" });
        }

        // Xóa tất cả câu trả lời của câu hỏi này
        await Answer.destroy({ where: { question_id } });

        // Sau khi xóa câu trả lời, xóa câu hỏi
        await question.destroy();

        res.status(200).json({ message: `Câu hỏi và các câu trả lời liên quan đã bị xóa` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
};
