const { Book } = require("../models");

async function createBook(data) {
    // Create book
    const newBook = await Book.create(data);

    return newBook;
}

module.exports = {
    createBook,
};