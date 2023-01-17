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
        res.status(404).json({message: errorMessage})
    }
}

module.exports = {getPosts, createPost, updatePost}