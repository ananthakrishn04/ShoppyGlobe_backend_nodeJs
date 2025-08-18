import mongoose from "mongoose";

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