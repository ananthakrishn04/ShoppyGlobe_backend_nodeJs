import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({message : "Successfully retrieved all Products", data : products})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNVAL SERVER ERROR"})
    }
}

export const getProduct = async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({message : `Product with ID : ${id} not found`})
        }

        return res.status(200).json({message : "Successfully Retrieved Product", data : product})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNVAL SERVER ERROR"})
    }
}

export const addProduct = async(req, res) => {
    try{
        const product = await Product.create(req.body)
        return res.status(200).json({message : "Successfully Added Product", data : product})
    }catch(err){
        if(err.name === "ValidationError"){
            const messages = Object.values(err.errors).map(err => err.message);
            return res.status(400).json({
                message: "Validation Error",
                errors: messages
            });
        }
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNVAL SERVER ERROR"})
    }
}