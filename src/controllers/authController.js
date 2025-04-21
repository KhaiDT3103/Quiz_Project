const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "954303627004-qcl5t7mb6sk8ge83qlnb3286vovs6bm6.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const admin = require("../models/firebaseAdmin");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Sequelize } = require("sequelize");
const { User } = require("../models"); // Import model User từ Sequelize

passport.use(new GoogleStrategy({
    clientID: "954303627004-qcl5t7mb6sk8ge83qlnb3286vovs6bm6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ where: { google_id: profile.id } });

            if (!user) {
                user = await User.create({
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.user_id); // hoặc user.id tuỳ theo model
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
exports.googleLogin = async (req, res) => {
    try {
        const { id_token } = req.body;
        if (!id_token) return res.status(400).json({ message: "Thiếu id_token 👹" });

        // Xác minh id_token bằng Firebase
        const decodedToken = await admin.auth().verifyIdToken(id_token);

        const { email, name, uid } = decodedToken;
        const username = name || email?.split("@")[0] || "user_" + Date.now();

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                username,
                email,
                password: await bcrypt.hash(uid, 10), // không dùng uid cũng được
                role: "student"
            });
        }

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        const userSafe = { ...user.toJSON() };
        delete userSafe.password;
        res.json({
            message: "Đăng nhập bằng Google thành công 👹",
            user: userSafe,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Xác thực thất bại ❌", error: error.message });
    }
};
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;


        const existingUsername = await User.findOne({ where: { email } });
        if (existingUsername) return res.status(400).json({ message: "Email đã tồn tạ👹" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "Đăng ký thành công👹", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ👹", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại👹" });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng👹" });

        // Tạo token JWT


        res.json({
            message: "Đăng nhập thành công👹", user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi máy chủ👹", error });
    }
};
