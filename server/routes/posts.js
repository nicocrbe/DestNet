const postRouter = require("express").Router()
const {getPosts, createPost, updatePost, deletePost, likePost} = require("../controllers/posts")

postRouter.get("/", getPosts)
postRouter.post("/", createPost)
postRouter.patch("/:id", updatePost)
postRouter.delete("/:id", deletePost)
postRouter.patch("/:id/likePost", likePost)

module.exports = postRouter