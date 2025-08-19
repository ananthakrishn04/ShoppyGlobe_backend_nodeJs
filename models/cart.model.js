import mongoose from "mongoose";

//custom Cart item schema for storing product : ID and quantity ; Number
const cartItemSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1,
        min : 1
    }
})

//Cart schema Object for storing the cart document which contains user : Id,
// items : [CartItemSchema], 
const cartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
        unique : true
    },
    items : [cartItemSchema],
},{timestamps : true});

const Cart = mongoose.model("cart", cartSchema)

export default Cart;
