import express from 'express'
import cors from 'cors'
import * as config from './config.js'
import * as model from './model.js'
import mongoose from 'mongoose'
import booksRouter from './routes/books.js'

const app = express()

app.use('/', booksRouter)

app.use(cors())

mongoose.set('strictQuery', false)
model.connection()

app.listen(config.PORT, () => console.log(`Listening on port http://localhost:${config.PORT}`));