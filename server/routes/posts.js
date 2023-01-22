const postRouter = require("express").Router()
const {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch} = require("../controllers/posts")
const auth = require("../middleware/auth")

postRouter.get("/", getPosts)
postRouter.get("/search", getPostsBySearch)
postRouter.post("/", auth, createPost)
postRouter.put("/:id", auth, updatePost)
postRouter.delete("/:id", auth, deletePost)
postRouter.put("/:id/likepost", auth, likePost)

module.exports = postRouter