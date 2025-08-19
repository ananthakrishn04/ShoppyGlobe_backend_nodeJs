import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { addToCart, clearCart, updateQuantity } from "../controllers/cart.controller.js"

const CartRoutes = express.Router()
//add auth middleware for jwt
CartRoutes.use(authMiddleware)

// POST /api/cart --> addToCart
CartRoutes.post("/", addToCart)

// PUT /api/cart ---> Update Product quantity in Cart 
CartRoutes.put("/", updateQuantity)

//DEL .api/cart ----> Clear all Products in Cart
CartRoutes.delete("/", clearCart)

export default CartRoutes;