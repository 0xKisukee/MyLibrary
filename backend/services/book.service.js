const { Book } = require("../models");

async function createBook(data) {
    // Create book
    const newBook = await Book.create(data);

    return newBook;
}

async function getAllBooks() {
    const books = await Book.findAll();
    return books;
}

module.exports = {
    createBook,
    getAllBooks,
};