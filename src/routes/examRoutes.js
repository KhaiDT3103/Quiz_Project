const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.get("/:subsubject_id", examController.getAllExamsBySubjectID);
module.exports = router;