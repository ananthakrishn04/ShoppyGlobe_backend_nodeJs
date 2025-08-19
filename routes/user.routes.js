import express from "express"
import { login, register } from "../controllers/user.controller.js"

const UserRoutes = express.Router()

UserRoutes.post("/register", register)
UserRoutes.post("/login", login)

export default UserRoutes;