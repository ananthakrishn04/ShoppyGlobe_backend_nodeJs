import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register = async(req, res) => {
    try {
        const { name, password, email } = req.body
        const userCheck = await User.findOne({name})

        if(userCheck){
            return res.status(400).json({message : "User already registered"})
        }
        const hashed_password = bcrypt.hashSync(password, 10)

        const user = await User.create({name, hashed_password , email})
        return res.status(201).json({message: "User registered Successfully"})
    }catch(err){
        if(err.name === "ValidationError"){
            const messages = Object.values(err.errors).map(err => err.message);
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
        const { name, password } = req.body
        const user = await User.findOne({name})

        if(!user){
            return res.status(404).json({message : "USER NOT FOUND IN DATABASE"})
        }

        if(!bcrypt.compareSync(password, user.hashed_password)){
            return res.status(401).json({message : "INVALID CREDENTIALS PROVIDED"})
        }

        const token = jwt.sign({ id : user._id }, process.env.SECRET_KEY, {expiresIn: "30m"})
        return res.status(200).send({message : "Logged In Successfully", token : token})

    }catch(err){
        console.error("Server Error : ", err)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

