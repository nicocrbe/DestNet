const {Schema, model} = require("mongoose")

const conversationSchema = new Schema(
    {
        members: {
            type: Array,
        },
    },
    {timestamps: true}
)

conversationSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Conversation = model("Conversation",conversationSchema)

module.exports = Conversation