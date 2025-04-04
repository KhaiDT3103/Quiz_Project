const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.get("/:subsubject_id", examController.getAllExamsBySubjectID);
router.get("/quests/:subsubject_id", examController.getAllExamsBySubjectIDWithQuestion);
router.get("/creator/:user_id", examController.getAllExamsByUserID);
router.post("/", examController.createExam);
module.exports = router;