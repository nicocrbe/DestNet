const userRouter = require("express").Router()
const {signin, signup} = require("../controllers/users")

userRouter.post("/signin", signin)
userRouter.post("/signup", signup)


module.exports = userRouter