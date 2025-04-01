const { Exam, User, Result } = require("../models");
const { Sequelize } = require("sequelize");
const moment = require("moment-timezone");

exports.createResult = async (req, res) => {
    try {
        const { user_id, exam_id, score } = req.body;
        if (!user_id || !exam_id || !score) {
            return res.status(400).json({ message: "Thiếu thông tin" });
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const submitted_at = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        const newResult = await Result.create({ user_id, exam_id, score, submitted_at });
        res.status(201).json({
            message: "Nộp bài thành công",
            user: user.username,
            score: newResult.score,
            submitted_at: newResult.submitted_at
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};