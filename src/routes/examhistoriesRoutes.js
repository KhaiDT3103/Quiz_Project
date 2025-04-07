const express = require("express");
const router = express.Router();
const examhistories = require("../controllers/examhistoriesController");

router.get("/:user_id", examhistories.getHisByUser);
module.exports = router;