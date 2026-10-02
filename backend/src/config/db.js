import mongoose from "mongoose";
import ENV from "./config.js"

async function connectDB(){
    try {
        await mongoose.connect(ENV.MONGODB_URI)

        console.log("Database connected sucessfully !")
        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;