const { Exam, Question, ExamQuestion, Answer } = require("../models");
const { Sequelize } = require("sequelize");

exports.getAllQuestionByExamsID = async (req, res) => {
    try {
        const { exam_id } = req.params; // Lấy exam_id từ request params

        const exam = await Exam.findOne({
            where: { exam_id: exam_id },
            include: [
                {
                    model: Question, // Lấy danh sách câu hỏi của bài thi
                    through: { attributes: [] }, // Ẩn bảng trung gian
                    include: [
                        {
                            model: Answer, // Lấy danh sách câu trả lời của mỗi câu hỏi
                            as: "answers", // Đảm bảo alias này khớp với model của bạn
                            attributes: ["answer_id", "answer_text", "is_correct"]
                        }
                    ]
                }
            ]
        });

        if (!exam) {
            return res.status(404).json({ message: "Exam không tồn tại" });
        }

        res.json({ exam_id, questions: exam.Questions });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
};