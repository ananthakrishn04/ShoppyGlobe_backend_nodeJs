import mongoose from "mongoose";

//User Schema with name : String, hashed_password : String, email : String
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    hashed_password : {
        type : String,
        required : true,
        minlength : 6
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
})


const User = mongoose.model("user", userSchema)

export default User;