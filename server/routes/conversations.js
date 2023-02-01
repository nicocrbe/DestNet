const conversationsRouter = require("express").Router()
const auth = require("../middleware/auth")
const {newConversation, getConversations, getConversationWithTwoUsers} = require("../controllers/conversations")

conversationsRouter.post("/", newConversation)
conversationsRouter.get("/:userId", getConversations)
conversationsRouter.get("/find/:firstUserId/:secondUserId", getConversationWithTwoUsers)

module.exports = conversationsRouter