const {Schema, model} = require("mongoose")

const messageSchema = new Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {timestamps: true}
)

messageSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Message = model("Message",messageSchema)

module.exports = Message