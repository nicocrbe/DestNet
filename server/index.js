require("dotenv").config()
require("./database")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const postRouter = require("./routes/posts")
const userRouter = require("./routes/users")
const conversationsRouter = require("./routes/conversations")
const messageRouter = require("./routes/messages")

const app = express()
app.use(bodyParser.json({limit: "40mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "40mb", extended: true}))
app.use(cors())

app.use("/posts", postRouter)
app.use("/users", userRouter)
app.use("/conversation", conversationsRouter)
app.use("/message", messageRouter)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

