const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/:subject_id", questionController.getAllQuestionBySubjectID);
router.get("/creator/:user_id", questionController.getAllQuestionByUserID);
router.post("/", questionController.createQuestion);
router.delete("/:question_id", questionController.deleteQuestion);
router.put("/:question_id", questionController.updateQuestionWithAnswers);
module.exports = router;