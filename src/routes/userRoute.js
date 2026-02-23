import express from 'express'
import { login, register } from '../controllers/userController.js'
import { verification } from '../emailVerify/verifyToken.js'

const userRoute = express.Router()

userRoute.post('/register', register)
userRoute.get('/verify', verification)
userRoute.post('/login', login)

export default userRoute