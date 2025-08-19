import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { addToCart, clearCart, updateQuantity } from "../controllers/cart.controller.js"

const CartRoutes = express.Router()
CartRoutes.use(authMiddleware)

CartRoutes.post("/", addToCart)
CartRoutes.put("/", updateQuantity)
CartRoutes.delete("/", clearCart)

export default CartRoutes;