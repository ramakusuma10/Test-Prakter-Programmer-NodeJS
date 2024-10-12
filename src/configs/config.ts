import dotenv from 'dotenv'
dotenv.config()

export const SALT_ROUND = process.env.SALT_ROUND
export const SECRET_KEY = process.env.SECRET_KEY

