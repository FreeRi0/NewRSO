const Router = require("express");
const router = new Router();

const userRouter = require("./auth");

router.use("/user", userRouter);

module.exports = router;