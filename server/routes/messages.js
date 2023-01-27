const messageRouter = require("express").Router()
const {newMessage, getMessages} = require("../controllers/messages")

messageRouter.post("/", newMessage)
messageRouter.get("/:conversationId", getMessages)

module.exports = messageRouter