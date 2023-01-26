import express from 'express'
import cors from 'cors'
import * as config from './config.js'
import * as model from './model.js'
const app = express()
import mongoose from 'mongoose'


mongoose.set('strictQuery', false)
const conn = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNECTION)
        console.log('connected to MongoDB');
        
    } catch (e: any) {
        console.error(e.message);
        
    }
}
conn()

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiDocumintation());
});

app.get('/book', async (req: express.Request, res: express.Response) => {
	try {
		const book = (await model.getBook());
		res.json(book);
		
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.listen(config.PORT, () => {
	console.log(`Listening on port http://localhost:${config.PORT}`);
});