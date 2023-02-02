import { Book } from './models/Book.js'
import { IBook } from './interfaces.js'
import express from 'express'
import mongoose from 'mongoose'
import * as config from './config.js'

export const connection = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNECTION)
        console.log('connected to MongoDB');
        
    } catch (e: any) {
        console.error(e.message);
        
    }
}

export const getBooks = async (req: express.Request, res: express.Response) => {
	const book = new Promise( async (resolve, reject) => {
		try {
			const books: IBook[] = await Book.find();
            
			if (books.length > 0) {
                resolve(books);
			} else {
				reject({
					status: "error",
					message: "collection not found"
				});
			}
		}
		catch (e) {
			console.error(e);
		}
	})
    res.send(await book)
}

export const getBook = async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const book = await Book.findOne({ _id: id })
    book ? res.json(book) : res.send('Book not found')
}

export const deleteBook = async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const book = await Book.findOne({ _id: id })
    book ? res.send(`Book with id ${id} has been deleted`) : res.send(`Book with id ${id} not found`)
}

export const getApiDocumentation = (req: express.Request, res: express.Response) => {
    const apiDocumentation = `
        <style>
            body { background-color: #333;
                font-family: courier; }
            ul { background-color: #111;
                padding: 1rem; }
            li { font-size: 1.3rem;
                color: gray; }
            a { color: indianred; }
        </style>
        <h1>Api Docs.</h1>
        <ul>
            <li>
                <a href='/books'>/books</a> Get all books
            </li>
        </ul>
    `
    res.send(apiDocumentation);
}