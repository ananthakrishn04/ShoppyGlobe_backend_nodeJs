import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 5050

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/").then(() => {
    console.info("DB CONNECTION SUCCESSFULL")
}).catch(() => {
    console.info("DB CONNECTION FAILED")
})






app.listen(PORT , () => {
    console.info(`SERVER LISTENING AT PORT : ${PORT}`)
})






