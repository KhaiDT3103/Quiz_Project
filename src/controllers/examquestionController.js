const { Exam, Question, ExamQuestion, Answer } = require("../models");
const { Sequelize } = require("sequelize");

exports.getAllQuestionByExamsID = async (req, res) => {
    try {
        const { exam_id } = req.params;

        const exam = await Exam.findOne({
            where: { exam_id: exam_id },
            include: [
                {
                    model: Question,
                    through: { attributes: [] },
                    include: [
                        {
                            model: Answer,
                            as: "answers",
                            attributes: ["answer_id", "answer_text", "is_correct"]
                        }
                    ]
                }
            ]
        });

        if (!exam) {
            return res.status(404).json({ message: "Exam không tồn tại👹" });
        }

        res.json({ exam_id, questions: exam.Questions });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message || error });
    }
};

exports.deleteAllQuestionsFromExam = async (req, res) => {
    try {
        const { exam_id } = req.params;

        if (!exam_id) {
            return res.status(400).json({ message: "Thiếu mã bài thi 👹" });
        }

        // Xóa tất cả bản ghi liên kết giữa exam và question trong bảng trung gian
        const deleted = await ExamQuestion.destroy({
            where: { exam_id }
        });

        res.json({ message: "Đã xóa tất cả câu hỏi khỏi bài thi", deleted });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server 👹", error: error.message || error });
    }
};