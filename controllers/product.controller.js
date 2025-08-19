import Product from "../models/product.model.js";

//Get all Products Logic Implemented here
export const getProducts = async(req, res) => {
    try{
        //find all products
        const products = await Product.find();
        return res.status(200).json({message : "Successfully retrieved all Products", data : products})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNVAL SERVER ERROR"})
    }
}

//Get Product with specified ID
export const getProduct = async(req, res) => {
    try{
        //parse id from path parameters
        const { id } = req.params;
        //check if product exists in database
        const product = await Product.findById(id)

        //if not, send error response
        if(!product){
            return res.status(404).json({message : `Product with ID : ${id} not found`})
        }

        return res.status(200).json({message : "Successfully Retrieved Product", data : product})
    }catch(err){
        console.error(`SERVER ERROR : ${err}`)
        return res.status(500).json({message : "INTERNVAL SERVER ERROR"})
    }
}

//Add Product Logic Implemented here
export const addProduct = async(req, res) => {
    try{
        // add new product with create method
        const product = await Product.create(req.body)
        return res.status(200).json({message : "Successfully Added Product", data : product})
    }catch(err){
        //check for validation errors
        if(err.name === "ValidationError"){
            //send validation errors to user
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