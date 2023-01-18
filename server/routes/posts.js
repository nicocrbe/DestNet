const postRouter = require("express").Router()
const {getPosts, createPost, updatePost, deletePost, likePost} = require("../controllers/posts")

postRouter.get("/", getPosts)
postRouter.post("/", createPost)
postRouter.put("/:id", updatePost)
postRouter.delete("/:id", deletePost)
postRouter.put("/:id/likepost", likePost)

module.exports = postRouter