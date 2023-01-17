const PostMessage = require("../models/postMessage")
const mongoose = require("mongoose")

const getPosts = async(req,res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }catch(error){
        res.status(404).json({message: error.message})
        console.error(error)
    }
}

const createPost = async(req,res) => {
    const postToAdd = req.body
    const newPost = new PostMessage(postToAdd)

    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

const updatePost = async(req,res) => {
    const {id: _id} = req.params
    const { post } = req.body

    try{
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not existing id")

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
        res.status(200).json(updatedPost)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

const deletePost = async(req,res) => {
    const {id: _id} = req.params
    
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not existing id")
        await PostMessage.findByIdAndRemove(_id)
        res.status(204).json({message: "Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const likePost = async(req,res) => {
    const {id: _id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not existing id")
        const currentPost = await PostMessage.findById(_id)
        const likedPost = await PostMessage.findByIdAndUpdate(_id, { likeCounter: currentPost.likeCounter + 1}, {new: true})
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getPosts, createPost, updatePost, deletePost, likePost}