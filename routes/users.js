const router = require("express").Router();
const userController = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/auth", auth, userController.auth);

module.exports = router;
