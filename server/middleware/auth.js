const jwt = require("jsonwebtoken")

const auth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500 //check if its google jwt or custom jwt

        let decodedData

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, "test")
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.error(error)
    }
}

module.exports = auth