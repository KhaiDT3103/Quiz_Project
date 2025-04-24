const express = require("express");
const router = express.Router();
const examhistories = require("../controllers/examhistoriesController");

router.get("/:user_id", examhistories.getHisByUser);
router.get("/ans/:history_id", examhistories.getHisUserByHisID);
router.get("/exams/:exam_id", examhistories.getTakersByExamId);
router.post("/submit", examhistories.submitExam);

module.exports = router;