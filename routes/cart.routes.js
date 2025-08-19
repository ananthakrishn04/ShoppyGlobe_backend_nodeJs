import express from "express"

const CartRoutes = express.Router()

CartRoutes.post("/cart")
CartRoutes.put("/cart")
CartRoutes.delete("/cart")


export default CartRoutes;