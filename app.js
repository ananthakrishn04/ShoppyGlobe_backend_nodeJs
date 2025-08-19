import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRoutes from "./routes/user.routes.js"
import ProductRoutes from "./routes/product.routes.js"
import CartRoutes from "./routes/cart.routes.js"

dotenv.config()

const PORT = process.env.PORT || 5050

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.info("DB CONNECTION SUCCESSFUL")
}).catch(() => {
    console.info("DB CONNECTION FAILED")
})

app.use("/api/user", UserRoutes)
app.use("/api/products", ProductRoutes)
app.use("/api/cart", CartRoutes)


app.listen(PORT , () => {
    console.info(`SERVER LISTENING AT PORT : ${PORT}`)
})