const router = require('express').Router();
const sudokuController = require('../controllers/sudoku');
const userDetermine = require('../middleware/user');
const auth = require('../middleware/auth');

router.get('/generate', sudokuController.generate);
router.put('/record', auth, sudokuController.record);
router.get('/record', auth, sudokuController.getRecord);

module.exports = router;