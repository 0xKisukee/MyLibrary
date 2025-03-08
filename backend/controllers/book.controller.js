const bookService = require('../services/book.service.js');

async function createBook(req, res, next) {
    try {
        const data = req.body;
        await bookService.createBook(data);
        res.send('Created a book!');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBook,
};