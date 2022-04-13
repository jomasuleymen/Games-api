const router = require('express').Router();
const userController = require('../controllers/users');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', userController.me);

module.exports = router;