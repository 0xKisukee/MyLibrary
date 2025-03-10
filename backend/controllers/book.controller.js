const bookService = require('../services/book.service.js');

async function createBook(req, res, next) {
    try {
        const data = req.body;
        const createdBook = await bookService.createBook(data);
        res.json(createdBook);
    } catch (err) {
        next(err);
    }
}

async function getAllBooks(req, res, next) {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBook,
    getAllBooks,
};