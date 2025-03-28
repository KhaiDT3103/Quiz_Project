const express = require("express");
const router = express.Router();
const subsubjectController = require("../controllers/subsubjectController");

router.get("/", subsubjectController.getAllSubSubject);
router.post("/", subsubjectController.createSubSubject);
router.delete("/:subsubject_id", subsubjectController.deleteSubSubject);
router.put("/:subsubject_id", subsubjectController.updateSubSubject);
module.exports = router;