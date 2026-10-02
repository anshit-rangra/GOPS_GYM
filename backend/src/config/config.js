import { config } from "dotenv"

config()

const ENV = {

    MONGODB_URI:process.env.MONGODB_URI,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    QR_SECRET:process.env.QR_SECRET

}



export default ENV;