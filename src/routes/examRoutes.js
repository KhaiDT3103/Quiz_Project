const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.get("/:subsubject_id", examController.getAllExamsBySubjectID);
router.get("/quests/:subsubject_id", examController.getAllExamsBySubjectIDWithQuestion);
router.get("/sin/:exam_id", examController.getExamByID);
router.get("/creator/:user_id", examController.getAllExamsByUserID);
router.post("/", examController.createExam);
router.delete("/quest/:exam_id", examController.deleteExamWithQuestions);
router.put("/update/:exam_id", examController.updateExamAndQuestions);
module.exports = router;