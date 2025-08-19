import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
    try{
        const userId = req.user.id
        const { product , quantity } = req.body

        let userCart = await Cart.findOne({user : userId})

        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
        }

        const prod = await Product.findById(product)

        if(!prod){
            return res.status(404).json({message : "Product Not Found"})
        }

        const existingItem = userCart.items.find((item) => item.product.toString() === product)

        if(existingItem){
            existingItem.quantity += quantity
        }else{
            userCart.items.push({product : product, quantity : quantity})
        }

        await userCart.save()
        await userCart.populate("items.product")

        return res.status(200).json({message : "Successfully added product to Cart", data : userCart})
    
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}


export const updateQuantity = async (req, res) => {
    try{
        const userId = req.user.id
        const { product, quantity } = req.body

        let userCart = await Cart.findOne({user : userId})

        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
        }

        const prod = await Product.findById(product)

        if(!prod){
            return res.status(404).json({message : "Product Not Found"})
        }

        const existingItem = userCart.items.find((item) => item.product.toString() === product)

        if(!existingItem){
            return res.status(404).json({message : "Product Not added in Cart"})    
        }

        existingItem.quantity = quantity

        await userCart.save()
        await userCart.populate("items.product")
        
        return res.status(200).json({message : "Successfully updated Cart", data : userCart})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
        
}

export const clearCart = async (req, res) => {
    try{
        const userId = req.user.id

        let userCart = await Cart.findOne({user : userId})

        if(!userCart){
            userCart = await Cart.create({user : userId, items : []})
            return res.status(200).json({ message : "Cart Clear Successfull", data : userCart})
        }

        userCart.items = []
        await userCart.save()
        return res.status(200).json({message : "Cart Clear Successfull", data : userCart})

    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNAL SERVER ERROR"})
    }
}