import express from 'express'
import * as model from '../model.js'
import cors from 'cors'
import * as config from '../config.js'
import session from 'express-session'

const router = express()
router.use(express.json())

router.use(cors({
	origin: config.FRONTEND_URL,
	methods: ['POST', 'GET', 'DELETE', 'PUT'],
	credentials: true
}))

router.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: config.SESSION_SECRET as any,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		}
	})
);

router.get('/', model.getApiDocumentation);

router.post('/login', model.login);

router.get('/get-current-user', model.getCurrentUser);

router.get('/logout', model.logout);

router.get('/books', model.getBooks);

router.get('/books/:id', model.getBook);

router.delete('/books/:id', model.authorizeUser, model.deleteBook);

router.post('/books', model.authorizeUser, model.addBook)

router.put('/books/:id', model.authorizeUser, model.updateBook)

export default router