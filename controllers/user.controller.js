import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//User Registration Logic implemented here
export const register = async(req, res) => {
    try {
        //parse name, password, email from req.body
        const { name, password, email } = req.body
        //check if user with this username already exists
        const userCheck = await User.findOne({name})

        //if exists
        if(userCheck){
            //send error response saying user had already been registered in database
            return res.status(400).json({message : "User already registered"})
        }

        //hash the provided password 
        const hashed_password = bcrypt.hashSync(password, 10) //10 salt rounds

        //create user with provided fields and send success response
        const user = await User.create({name, hashed_password , email})
        return res.status(201).json({message: "User registered Successfully"})
    }catch(err){
        //check if any validation errors
        if(err.name === "ValidationError"){
            //returns all the validation errors back to the user
            const messages = Object.values(err.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation Error",
                errors: messages
            });
        }

        console.error("Server Error : ", err.message)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

//User Login logic implemented here
export const login = async(req, res) => {
    try {
        // parse name and password from request body
        const { name, password } = req.body
        //check if user exists with said username
        const user = await User.findOne({name})

        //if user does not exists, send error response
        if(!user){
            return res.status(404).json({message : "USER NOT FOUND IN DATABASE"})
        }

        //if user exists, compared given password with hashed password stored in database
        if(!bcrypt.compareSync(password, user.hashed_password)){
            return res.status(401).json({message : "INVALID CREDENTIALS PROVIDED"})
        }

        //if password is valid, create a jwt token with the userId as payload with
        //expiration time of 30m
        const token = jwt.sign({ id : user._id }, process.env.SECRET_KEY, {expiresIn: "30m"})
        return res.status(200).send({message : "Logged In Successfully", token : token})

    }catch(err){
        console.error("Server Error : ", err.message)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

