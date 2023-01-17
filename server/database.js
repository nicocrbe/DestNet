const mongoose = require("mongoose")

const CONNECTION_URL = process.env.MONGO_DB_URI

mongoose.set("strictQuery", false)
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=> {
        console.log("Database connected")
    })
    .catch((error) => {
        console.error(error.message)
    })
