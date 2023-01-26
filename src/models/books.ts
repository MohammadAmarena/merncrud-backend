import mongoose from 'mongoose'

const booksSchema = new mongoose.Schema({
    title: String,
	description: String,
	numberOfPages: Number,
	language: String,
	imageUrl: String,
	buyUrl: String
})

export const book = mongoose.model('Book', booksSchema)