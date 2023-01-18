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
        default: Date.now()
    }
})

postSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const PostMessage = model("PostMessage",postSchema)

module.exports = PostMessage