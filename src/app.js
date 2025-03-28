const express = require("express");
const app = express();

const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

//api
app.get("/", (req, res) => {
    res.send("✅server chạy thành công!");
});
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);

module.exports = app;
