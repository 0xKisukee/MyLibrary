const bookService = require('../services/book.service.js');

async function createBook(req, res, next) {
    try {
        const data = req.body;
        res.send('Creating a book!');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBook,
};