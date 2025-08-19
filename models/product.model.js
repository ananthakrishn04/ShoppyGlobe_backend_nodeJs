import mongoose from "mongoose";

//Product Schema with name : String, price : Number, stock : Number
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    description : String
})


const Product = mongoose.model("product",productSchema)

export default Product;