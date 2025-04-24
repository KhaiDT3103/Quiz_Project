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
                        attributes: ["answer_id", "answer_text", "is_correct"]
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
            selectedMap[Number(ans.question_id)] = Number(ans.selected_answer_id);

        });

        // Xử lý cấu trúc dữ liệu trả về
        const formattedQuestions = history.exam.question.map(q => ({
            question_id: q.question_id,
            question_text: q.question_text,
            answers: q.answers.map(a => ({
                answer_id: a.answer_id,
                answer_text: a.answer_text,
                is_correct: a.is_correct,
                selected_answer: selectedMap[Number(q.question_id)] === Number(a.answer_id)

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
//Lấy lịch sử theo exam_id
exports.getTakersByExamId = async (req, res) => {
    try {
        const { exam_id } = req.params;

        const exam = await Exam.findByPk(exam_id);
        if (!exam) {
            return res.status(404).json({ message: "Không tìm thấy bài kiểm tra 👹" });
        }

        const histories = await ExamHistories.findAll({
            where: { exam_id },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["user_id", "username", "email"]
                }
            ],
            order: [["score", "DESC"]]
        });

        const result = histories.map(h => ({
            user_id: h.user_id,
            username: h.user?.username,
            email: h.user?.email,
            score: h.score,
            started_at: h.started_at,
            finished_at: h.finished_at
        }));

        res.json({
            exam: {
                exam_id: exam.exam_id,
                title: exam.title
            },
            takers: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server 👹", error: error.message });
    }
};

//Nộp bài thi
exports.submitExam = async (req, res) => {
    try {
        const { user_id, exam_id, answers, started_at, finished_at } = req.body;

        if (!user_id || !exam_id || !answers || !Array.isArray(answers) || !started_at || !finished_at) {
            return res.status(400).json({ message: "Thiếu dữ liệu đầu vào 👹" });
        }

        // Tính thời gian làm bài (đơn vị: giây)
        const total_time = Math.floor((new Date(finished_at) - new Date(started_at)) / 1000);

        // Kiểm tra số câu đúng
        let correctCount = 0;
        let total = 0;

        const answerRecords = await Promise.all(
            answers.map(async ({ question_id, selected_answer_id }) => {
                const answer = await Answer.findOne({
                    where: {
                        answer_id: selected_answer_id,
                        question_id: question_id
                    }
                });
                total++;
                const isCorrect = answer ? answer.is_correct : false;
                if (isCorrect) correctCount++;

                return {
                    question_id,
                    selected_answer_id,
                    is_correct: isCorrect
                };
            })
        );
        let score = (10 / total) * correctCount;
        // Tạo lịch sử thi
        const history = await ExamHistories.create({
            exam_id,
            user_id,
            score: score,
            started_at,
            finished_at,
            total_time
        });

        // Gắn thêm history_id rồi lưu vào ExamHistoryAns
        const answersWithHistoryID = answerRecords.map(ans => ({
            ...ans,
            history_id: history.history_id
        }));

        await ExamHistoryAns.bulkCreate(answersWithHistoryID);

        return res.status(200).json({
            message: "Nộp bài thành công ✅",
            history_id: history.history_id,
            score: score,
            total_questions: answers.length,
            total_time
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server 👹", error: error.message });
    }
};

