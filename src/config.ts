import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const MONGODB_CONNECTION = `mongodb+srv://Mohammad:${process.env.MONGODB_PASSWORD}@person.uz6t2xr.mongodb.net/book-site?retryWrites=true&w=majority`

export const BACKEND_URL = process.env.BACKEND_URL

export const FRONTEND_URL = process.env.FRONTEND_URL