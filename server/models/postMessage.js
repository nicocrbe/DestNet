const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    hashtags: [String],
    file: String,
    likeCounter: {
        type: Number,
        default: 0
    },
    cratedAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = model("PostMessage",postSchema)

module.exports = PostMessage