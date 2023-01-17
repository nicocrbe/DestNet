const postRouter = require("express").Router()
const {getPosts, createPost, updatePost} = require("../controllers/posts")

postRouter.get("/", getPosts)
postRouter.post("/", createPost)
postRouter.patch("/:id", updatePost)

module.exports = postRouter