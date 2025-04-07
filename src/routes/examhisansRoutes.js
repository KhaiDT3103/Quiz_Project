const express = require("express");
const router = express.Router();
const examhisans = require("../controllers/examhisansController");

router.get("/:history_id", examhisans.getAnswerHisByHisID);
module.exports = router;