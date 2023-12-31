const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');;

// router.post('/registration', [
//   check('username', "Имя пользователя не может быть пустым").notEmpty(),
//   check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], controller.registration)
// router.post('/login', controller.login)
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)

router.post("/register", userController.registration);
router.post("/login", userController.login);
router.get("/users", userController.getUsers);

module.exports = router;
