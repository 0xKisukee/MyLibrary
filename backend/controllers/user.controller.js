const userService = require('../services/user.service.js');
const bookService = require('../services/book.service.js');
const bcrypt = require('bcrypt');

async function login(req, res, next) {
    try {
        const token = await userService.login(req.body);

        // Renvoyer le token au client
        res.json({ token });
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        // Create user
        const userWithoutPwd = await userService.createUser(req.body);

        res.json(userWithoutPwd);
    } catch (err) {
        next(err);
    }
}

async function addBookToShelf(req, res, next) {
    try {
        const { userID, bookID } = req.params;
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
    login,
};