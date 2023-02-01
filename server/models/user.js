const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model("User",userSchema)

module.exports = User