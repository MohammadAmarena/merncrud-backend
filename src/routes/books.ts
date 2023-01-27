import express from 'express'
import * as model from '../model.js'

const router = express.Router()

router.get('/', model.getBooks);

export default router