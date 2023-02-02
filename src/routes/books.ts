import express from 'express'
import * as model from '../model.js'
import cors from 'cors'
import * as config from '../config.js'


const router = express()
router.use(express.json())

router.use(cors({
	origin: config.FRONTEND_URL,
	methods: ['POST', 'GET', 'DELETE', 'PUT'],
	credentials: true
}))

router.get('/', model.getApiDocumentation);

router.get('/books', model.getBooks);

router.get('/books/:id', model.getBook);

router.delete('/books/:id', model.deleteBook);

router.post('/books', model.addBook)

router.put('/books/:id', model.updateBook)

export default router