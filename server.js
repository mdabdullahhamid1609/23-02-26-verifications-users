import express from 'express'
import { dbConnect } from './src/config/dbConnect.js'
// import dotenv from "dotenv/config"
import dotenv from "dotenv"
import userRoute from './src/routes/userRoute.js'
import todoRoute from './src/routes/todoRoute.js'
import multerRoute from './src/routes/multerRoutes.js'
dotenv.config()

const app = express()
const port  = process.env.PORT

app.use(express.json())
app.use("/upload", express.static("upload"))
app.use('/user', userRoute)
app.use("/todo", todoRoute)
app.use("/upload", multerRoute)

dbConnect()

app.listen(port, ()=>{
    console.log(`Server running at port : ${port}`)
})