const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/:subject_id", questionController.getAllQuestionBySubjectID);
router.post("/", questionController.createQuestion);
router.delete("/:question_id", questionController.deleteQuestion);
module.exports = router;