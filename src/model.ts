import { Book } from './models/Book.js'
import { IBook } from './interfaces.js'

export const getBooks = async () => {
	return new Promise( async (resolve, reject) => {
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
}

export const getApiDocumintation = () => {
    return `
        <style>
            body {
                background-color: #333;
                font-family: courier;
            }
            ul {
                background-color: #111;
                padding: 1rem;
            }
            li {
                font-size: 1.3rem;
                color: gray;
            }
            a {
                color: yellow;
            }
        </style>
        <h1>Api Docs.</h1>
        <ul>
            <li>
                <a href='/book'>/books</a> Get all books
            </li>
        </ul>
    `
}