const express = require("express");
const router = express.Router();
const examquestionController = require("../controllers/examquestionController");

router.get("/:exam_id", examquestionController.getAllQuestionByExamsID);
module.exports = router;