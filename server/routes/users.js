const userRouter = require("express").Router()
const {signin, signup, getUsers, getUser} = require("../controllers/users")

userRouter.post("/signin", signin)
userRouter.post("/signup", signup)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUser)


module.exports = userRouter