import { Book } from './models/Book.js';
import { IBook } from './interfaces.js';
import express, { application } from 'express';
import mongoose from 'mongoose';
import * as config from './config.js';
declare module 'express-session' {
    export interface SessionData {
    user: { [key: string]: any };
    }
}

export const connection = async () => {
    try {
    await mongoose.connect(config.MONGODB_CONNECTION);
    console.log('connected to MongoDB');
    } catch (e: any) {
    console.error(e.message);
    }
};

export const login = (req: express.Request, res: express.Response) => {
    const { password } = req.body;
    if (password === config.ADMIN_PASSWORD) {
    req.session.user = 'admin' as any;
    req.session.cookie.expires = new Date(
      Date.now() + config.SECONDS_TILL_SESSION_TIMEOUT * 1000
    );
    req.session.save();
    res.status(200).send('OK');
    } else {
    res.status(400).send({});
    }
};

export const getCurrentUser = (req: express.Request, res: express.Response) => {
    req.session.user ? res.send(req.session.user) : res.send('anonymousUser');
};

export const logout = (req: express.Request, res: express.Response) => {
    req.session.destroy((err) => {
    err ? res.send('ERROR') : res.send('LOGGED OUT');
    });
};

export const authorizeUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session.user === 'admin' as any) {
        next()
    } else {
        res.status(401).send({});
    }
}

export const getBooks = async (req: express.Request, res: express.Response) => {
    try {
    const books: IBook[] = await Book.find();
    if (books.length > 0) {
        res.send(books);
    }
    } catch (e) {
    console.error(e);
    }
};

export const getBook = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const book = await Book.findOne({ _id: id });
    book ? res.json(book) : res.send('Book not found');
};

export const deleteBook = async (
    req: express.Request,
    res: express.Response
) => {
    const id = req.params.id;
    const book = await Book.deleteOne({ _id: id });
    book
    ? res.json(`book with id ${id} has been deleted`)
    : res.send('Book not found');
};

export const addBook = async (req: express.Request, res: express.Response) => {
    const rowBook: IBook = req.body;
    const book = new Promise(async (resolve, reject) => {
    const docBook = new Book(rowBook);
    const addedDocBook = await docBook.save();
    resolve(addedDocBook.toObject({ versionKey: false }));
    });
    res.send(await book);
};

export const updateBook = async (
    req: express.Request,
    res: express.Response
) => {
    const _id = req.params.id;
    const book: IBook = req.body;
    const oldBook = await Book.find({ _id });

    await Book.updateOne({ _id }, { $set: { ...book } });

    const newBook = await Book.find({ _id });

    res.status(200).send({
    oldBook: oldBook,
    result: newBook,
    });
};

export const getApiDocumentation = (
    req: express.Request,
    res: express.Response
) => {
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
    `;
    res.send(apiDocumentation);
};
