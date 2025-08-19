import express from "express"
import { getProduct, getProducts, addProduct } from "../controllers/product.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const ProductRoutes = express.Router()

ProductRoutes.get("/", getProducts)
ProductRoutes.get("/:id", getProduct)
ProductRoutes.post("/", addProduct)


export default ProductRoutes;