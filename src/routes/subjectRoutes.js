const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("/", subjectController.getAllSubjects);
router.get("/subsubjects/", subjectController.getAllSubjectsWithSubSubject);
router.post("/", subjectController.createSubject);
router.delete("/:subject_id", subjectController.deleteSubject);
router.put("/:subject_id", subjectController.updateSubject);
module.exports = router;
