import express from "express"

const ProductRoutes = express.Router()

ProductRoutes.get("/products")
ProductRoutes.get("/products/:id")
ProductRoutes.post("/products")


export default ProductRoutes;