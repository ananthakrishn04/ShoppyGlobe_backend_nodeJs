import express from "express"
import { getProduct, getProducts, addProduct } from "../controllers/product.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const ProductRoutes = express.Router()

// GET /api/products ----> Get Products
ProductRoutes.get("/", getProducts)

// GET /api/products/:id ---> Get Product with Specified ID
ProductRoutes.get("/:id", getProduct)

// POST /api/products ---> Add New Products
ProductRoutes.post("/", addProduct)


export default ProductRoutes;