const Message = require("../models/message")
const mongoose = require("mongoose")


const newMessage = async(req,res) => {
    const {conversationId, sender, text} = req.body
    const newMessage = new Message({
        conversationId,
        sender,
        text
    })
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getMessages = async(req,res) => {

    const {conversationId} = req.params

    try {
        const messages = await Message.find({conversationId})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {newMessage, getMessages}