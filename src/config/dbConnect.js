import mongoose from "mongoose"
import dotenv from 'dotenv/config'

const url = process.env.URL
export async function dbConnect (){
    try {
        await mongoose.connect(url)
        console.log("Mongo DB Connected")
    } catch (error) {
        console.log("Mongo DB Not Connected", error)
    }
}