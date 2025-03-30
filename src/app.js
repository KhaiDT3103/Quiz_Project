const express = require("express");
const cors = require("cors");
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
//api
app.get("/", (req, res) => {
    res.send("✅server chạy thành công!");
});
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/subsubjects", subsubjectRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
module.exports = app;
