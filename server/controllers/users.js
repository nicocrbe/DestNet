const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const signin = async(req,res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid password"})

        const credential = jwt.sign({email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "3h"})

        res.status(200).json({result: existingUser, credential})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.error(error)
    }
}

const signup = async(req,res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body
    console.log(req.body)
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) res.status(400).json({message: "User already exists"})
        
        if(password != confirmPassword) res.status(400).json({message: "Passwords don't match"})
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
        console.log({result})
        const credential = jwt.sign({email: result.email, id: result._id}, "test", {expiresIn: "3h"})

        res.status(200).json({result,credential})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.error(error)
    }
}

module.exports = {signin, signup}