import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRoutes from "./routes/user.routes.js"
import ProductRoutes from "./routes/product.routes.js"
import CartRoutes from "./routes/cart.routes.js"

//accessing environment variables
dotenv.config()

//setting PORT for SERVER listening
const PORT = process.env.PORT || 5050

const app = express()
//add middleware to parse request body as json
app.use(express.json())

//mongodb connection handler
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.info("DB CONNECTION SUCCESSFUL")
}).catch(() => {
    console.info("DB CONNECTION FAILED")
})

//use UserRoutes Router for all userManagement routes
app.use("/api/user", UserRoutes)
//use ProductRoutes Router for all productManagement routes
app.use("/api/products", ProductRoutes)
//use CartRoutes Router for all CartManagement routes
app.use("/api/cart", CartRoutes)

//Enables Server listening at specified port
app.listen(PORT , () => {
    console.info(`SERVER LISTENING AT PORT : ${PORT}`)
})