const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./controllers/authController");
const app = express();


const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
// Routes
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const subsubjectRoutes = require("./routes/subsubjectRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const authRoutes = require("./routes/authRoutes");
const examquestionRoutes = require("./routes/examquestionRoutes");
const examhistoriesRoutes = require("./routes/examhistoriesRoutes");
const examhisansRoutes = require("./routes/examhisansRoutes");
//api
app.get("/", (req, res) => {
    res.send("✅server chạy thành công!");
});
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/subsubjects", subsubjectRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/examquest", examquestionRoutes);
app.use("/api/history", examhistoriesRoutes);
app.use("/api/hisans", examhisansRoutes);

module.exports = app;
