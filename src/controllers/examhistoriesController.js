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
            include:
            {
                model: Exam,
                as: "exam", // alias trong mối quan hệ
                attributes: ["exam_id", "title", "description"] // Lấy các thông tin của bài thi
            }
        });

        if (!His || His.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy lịch sử thi của người dùng 👹" });
        }

        res.json({ user_id, histories: His });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message });
    }
};

exports.getHisUserByHisID = async (req, res) => {
    try {
        const { history_id } = req.params;
        if (!history_id) {
            return res.status(400).json({ message: "Thiếu mã lịch sử bài thi👹" });
        }

        // Lấy lịch sử thi + bài thi
        const history = await ExamHistories.findOne({
            where: { history_id },
            include: {
                model: Exam,
                as: "exam",
                attributes: ["exam_id", "title", "description"],
                include: {
                    model: Question,
                    as: "question",
                    attributes: ["question_id", "question_text"],
                    include: {
                        model: Answer,
                        as: "answers",
                        attributes: ["answer_id", "answer_text"]
                    }
                }
            }
        });

        if (!history) {
            return res.status(404).json({ message: "Không tìm thấy lịch sử thi 👹" });
        }

        // Lấy các câu trả lời đã chọn từ ExamHistoryAns
        const selectedAnswers = await ExamHistoryAns.findAll({
            where: { history_id },
            attributes: ["question_id", "selected_answer_id"]
        });

        const selectedMap = {};
        selectedAnswers.forEach(ans => {
            selectedMap[ans.question_id] = ans.selected_answer_id;
        });

        // Xử lý cấu trúc dữ liệu trả về
        const formattedQuestions = history.exam.question.map(q => ({
            question_id: q.question_id,
            question_text: q.question_text,
            answers: q.answers.map(a => ({
                answer_id: a.answer_id,
                answer_text: a.answer_text,
                selected_answer: selectedMap[q.question_id] === a.answer_id
            }))
        }));

        res.json({
            exam: {
                exam_id: history.exam.exam_id,
                title: history.exam.title,
                description: history.exam.description
            },
            question: formattedQuestions
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message });
    }
};