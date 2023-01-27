const conversationsRouter = require("express").Router()
const auth = require("../middleware/auth")
const {newConversation, getConversations} = require("../controllers/conversations")

conversationsRouter.post("/", newConversation)
conversationsRouter.get("/:userId", getConversations)

module.exports = conversationsRouter