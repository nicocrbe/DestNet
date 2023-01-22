const PostMessage = require("../models/postMessage")
const mongoose = require("mongoose")

const getPosts = async(req,res) => {
    const {page} = req.query
    try{
        const LIMIT = 8
        const startIndex = (Number(page) - 1 ) * LIMIT
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({id: -1}).limit(LIMIT).skip(startIndex)

        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    }catch(error){
        res.status(404).json({message: error.message})
        console.error(error)
    }
}

const getPost = async(req,res) => {
    const {id} = req.params
    try{
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({message: error.message})
        console.error(error)
    }
}

const getPostsBySearch = async(req,res) => {
    const {searchQuery, tags} = req.query
    
    try {
        const title = new RegExp(searchQuery, "i")
        
        const posts = await PostMessage.find({ $or: [{title}, {hashtags: {$in: tags.split(",")}}]})
        
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPost = async(req,res) => {
    const postToAdd = req.body
    const newPost = new PostMessage({...postToAdd, creator: req.userId, createdAt: new Date().toISOString()})

    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

const updatePost = async(req,res) => {
    const {id} = req.params
    const post = req.body

    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not existing id")

        const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, id}, {new: true})
        res.status(200).json(updatedPost)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

const deletePost = async(req,res) => {
    const {id} = req.params
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not existing id")
        await PostMessage.findByIdAndRemove(id)
        res.status(204).json({message: "Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const likePost = async(req,res) => {
    const {id} = req.params

    try {
        if(!req.userId) return res.json({message: "Unauthenticated"})
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not existing id")
        
        const currentPost = await PostMessage.findById(id)
        const currentPostIndex = currentPost.likeCounter.findIndex((id) => id === String(req.userId))

        if(currentPostIndex === -1){
            currentPost.likeCounter.push(req.userId)
        } else {
            currentPost.likeCounter = currentPost.likeCounter.filter((id) => id !== String(req.userId))
        }

        const likedPost = await PostMessage.findByIdAndUpdate(id, currentPost, {new: true})
        res.status(201).json(likedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost}