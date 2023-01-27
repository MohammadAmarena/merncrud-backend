import express from 'express'
import cors from 'cors'
import * as config from './config.js'
import * as model from './model.js'
const app = express()
import mongoose from 'mongoose'
import booksRouter from './routes/books.js'

app.use('/books', booksRouter)

mongoose.set('strictQuery', false)
model.connection()

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiDocumintation());
});

app.listen(config.PORT, () => {
	console.log(`Listening on port http://localhost:${config.PORT}`);
});