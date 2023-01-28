import express from 'express'
import * as model from '../model.js'

const router = express.Router()

router.get('/', model.getApiDocumentation);

router.get('/books', model.getBooks);

export default router