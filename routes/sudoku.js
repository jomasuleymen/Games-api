const router = require("express").Router();
const sudokuController = require("../controllers/sudoku");
const auth = require("../middleware/auth");

router.get("/board", sudokuController.generateBoard);
router.put("/records", auth, sudokuController.updateRecord);
router.get("/records", auth, sudokuController.retriveRecord);

module.exports = router;
