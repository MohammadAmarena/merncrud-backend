import express from 'express'
import * as model from '../model.js'
import cors from 'cors'


const router = express()
router.use(express.json())
router.use(cors())

router.get('/', model.getApiDocumentation);

router.get('/books', model.getBooks);

router.get('/books/:id', model.getBook);

router.delete('/books/:id', model.deleteBook);

router.post('/books', model.addBook)

export default router