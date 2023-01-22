const postRouter = require("express").Router()
const {getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch} = require("../controllers/posts")
const auth = require("../middleware/auth")

postRouter.get("/", getPosts)
postRouter.get("/search", getPostsBySearch)
postRouter.post("/", auth, createPost)
postRouter.put("/:id", auth, updatePost)
postRouter.delete("/:id", auth, deletePost)
postRouter.put("/:id/likepost", auth, likePost)
postRouter.get("/:id", getPost)

module.exports = postRouter