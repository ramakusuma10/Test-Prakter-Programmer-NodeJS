import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

export const SALT_ROUND = process.env.SALT_ROUND
export const SECRET_KEY = process.env.SECRET_KEY
export {cloudinary}

