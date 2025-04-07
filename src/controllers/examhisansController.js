const { ExamHistories, ExamHistoryAns, Answer, Question } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");
//Lấy danh sách câu trả lời của bài
exports.getAnswerHisByHisID = async (req, res) => {
    try {
        const { history_id } = req.params;
        if (!history_id) {
            return res.status(400).json({ message: "Thiếu mã lịch sử bài thi👹" });
        }

        // Tìm lịch sử thi của người dùng, kèm theo thông tin bài thi, người dùng và câu trả lời
        const HisAns = await ExamHistoryAns.findAll({
            where: { history_id: history_id },
            include:
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
        });

        if (!HisAns || HisAns.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy kết quả nào! 👹" });
        }

        res.json({ user_id, histories: His });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message });
    }
};
