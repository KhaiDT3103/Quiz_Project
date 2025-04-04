const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.get("/:subsubject_id", examController.getAllExamsBySubjectID);
router.post("/", examController.createExam);
module.exports = router;