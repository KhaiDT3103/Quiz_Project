const { Exam, User, Question, Answer, ExamHistories, ExamHistoryAns } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");

exports.getHisByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "Thiếu mã người dùng👹" });
        }

        // Tìm lịch sử thi của người dùng, kèm theo thông tin bài thi, người dùng và câu trả lời
        const His = await ExamHistories.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: Exam,
                    as: "exam", // alias trong mối quan hệ
                    attributes: ["exam_id", "title", "description"] // Lấy các thông tin của bài thi
                },
                {
                    model: ExamHistoryAns, // Kết hợp với bảng ExamHistoryAns
                    as: "examhisans", // alias trong mối quan hệ
                    attributes: ["id", "question_id", "selected_answer_id", "is_correct"], // Các thông tin cần lấy từ ExamHistoryAns
                    include: [
                        {
                            model: Question, // Giả sử bạn cũng muốn lấy thông tin câu hỏi
                            as: "question", // alias trong mối quan hệ
                            attributes: ["question_text"] // Lấy thông tin câu hỏi
                        },
                        {
                            model: Answer, // Giả sử bạn cũng muốn lấy thông tin câu trả lời đã chọn
                            as: "selectedAnswer", // alias trong mối quan hệ
                            attributes: ["answer_text"] // Lấy thông tin câu trả lời đã chọn
                        }
                    ]
                }
            ]
        });

        if (!His || His.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy lịch sử thi của người dùng 👹" });
        }

        res.json({ user_id, histories: His });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message });
    }
};

