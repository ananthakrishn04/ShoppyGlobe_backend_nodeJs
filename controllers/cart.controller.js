import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

//Add Product to Cart Logic Implemented here
export const addToCart = async (req, res) => {
    try{
        //parse userId from request
        const userId = req.user.id
        //parse productId and quantity of product from request body
        const { product , quantity } = req.body

        //check if Cart Document exists for authenticated user
        let userCart = await Cart.findOne({user : userId})

        //if not, create a new Cart Document
        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
        }

        //check if Product with specified ID exists
        const prod = await Product.findById(product)

        //if not return error
        if(!prod){
            return res.status(404).json({message : "Product Not Found"})
        }

        //check if the product has already been added to the cart
        const existingItem = userCart.items.find((item) => item.product.toString() === product)

        //if so, increment the quantity by sent quantity from request
        if(existingItem){
            existingItem.quantity += quantity
        }else{
            //else add a new item to cart.items
            userCart.items.push({product : product, quantity : quantity})
        }

        //since we edited the cart Document we save it.
        await userCart.save()
        //we populate the product value with the actual document instead of the product Id
        await userCart.populate("items.product")

        return res.status(200).json({message : "Successfully added product to Cart", data : userCart})
    
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}

//Update Quantity Logic Implemented here
export const updateQuantity = async (req, res) => {
    try{
        //parse userId from request
        const userId = req.user.id
        //parse productId and quantity of product from request body
        const { product, quantity } = req.body

        //check if Cart Document exists for authenticated user
        let userCart = await Cart.findOne({user : userId})

        //if not, create a new Cart Document
        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
        }

        //check if Product with specified ID exists
        const prod = await Product.findById(product)

        //if not return error
        if(!prod){
            return res.status(404).json({message : "Product Not Found"})
        }
        
        //check if the product has already been added to the cart
        const existingItem = userCart.items.find((item) => item.product.toString() === product)

        //if not return error
        if(!existingItem){
            return res.status(404).json({message : "Product Not added in Cart"})    
        }

        //replace the old quantity of product in cart to new quantity
        existingItem.quantity = quantity

        //since we edited the cart Document we save it.
        await userCart.save()
        //we populate the product value with the actual document instead of the product Id
        await userCart.populate("items.product")

        return res.status(200).json({message : "Successfully updated Cart", data : userCart})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
        
}

//Clear Cart Logic Implemented here
export const clearCart = async (req, res) => {
    try{
        //parse userId from request
        const userId = req.user.id

        //check if Cart Document exists for authenticated user
        let userCart = await Cart.findOne({user : userId})

        //if not, create a new Cart Document with zero items
        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
            return res.status(200).json({ message : "Cart Clear Successfull", data : userCart})
        }

        //clear items in cart Document
        userCart.items = []

        //since we edited the cart Document we save it.
        await userCart.save()
        return res.status(200).json({message : "Cart Clear Successfull", data : userCart})

    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}