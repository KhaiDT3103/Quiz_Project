const express = require("express");
const router = express.Router();
const examhistories = require("../controllers/examhistoriesController");

router.get("/:user_id", examhistories.getHisByUser);
router.get("/ans/:history_id", examhistories.getHisUserByHisID);
router.post("/submit", examhistories.submitExam);
module.exports = router;