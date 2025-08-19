import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const register = async(req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json({message: "User registered Successfully"})
    }catch(err){
        if(err.name === "ValidationError"){
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation Error",
                errors: messages
            });
        }

        console.error("Server Error : ", err)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

export const login = async(req, res) => {
    try {
        const user = await User.findOne(req.body)

        if(!user){
            return res.status(404).json({message : "INVALID CREDENTIALS / USER NOT FOUND IN DATABASE"})
        }

        const token = jwt.sign({ id : user._id }, process.env.SECRET_KEY, {expiresIn: "30m"})
        return res.status(200).send({message : "Logged In Successfully", token : token})

    }catch(err){
        console.error("Server Error : ", err)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

