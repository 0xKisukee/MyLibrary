const userService = require('../services/user.service.js');
const bookService = require('../services/book.service.js');
const bcrypt = require('bcrypt');

async function createUser(req, res, next) {
    try {
        const data = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Create user
        const userWithoutPwd = await userService.createUser(data);

        res.json(userWithoutPwd);
    } catch (err) {
        next(err);
    }
}

async function addBookToShelf(req, res, next) {
    try {
        const userID = req.params.userID;
        const bookID = req.params.bookID;
        const books = await userService.addBookToShelf(userID, bookID);

        res.json(books);
    } catch (err) {
        next(err);
    }
}

async function getUserShelf(req, res, next) {
    try {
        const shelf = await userService.getUserShelf(req.params.userID);

        res.json(shelf);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    addBookToShelf,
    getUserShelf,
};