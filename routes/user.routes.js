import express from "express"
import { login, register } from "../controllers/user.controller.js"

const UserRoutes = express.Router()

// POST /api/user/register ---> User Registration
UserRoutes.post("/register", register)

//POST /api/user/login ---> User Login
UserRoutes.post("/login", login)

export default UserRoutes;