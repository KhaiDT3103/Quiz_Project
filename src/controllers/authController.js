const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const { User } = require("../models"); // Import model User từ Sequelize

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;


        const existingUsername = await User.findOne({ where: { email } });
        if (existingUsername) return res.status(400).json({ message: "Email đã tồn tại" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });

        // Tạo token JWT
        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.AUTH_KEY, { expiresIn: "1h" });

        res.json({
            message: "Đăng nhập thành công", user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role
            }, token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};
