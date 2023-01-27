const Conversation = require ("../models/conversation")
const mongoose = require("mongoose")

const newConversation = async(req,res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getConversations = async(req,res) => {
    const {userId} = req.params
    try {
        const conversation = await Conversation.find({
            members: {$in: userId},
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {newConversation, getConversations}