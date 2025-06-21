import express from "express"
import { loginUser, registerUser } from "../controller/registerUser.controller.js"
import { protectedRoutes } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router