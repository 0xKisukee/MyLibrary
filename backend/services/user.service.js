const { User, Book } = require("../models");
const bcrypt = require('bcrypt');
const { AppError } = require('../middlewares/errorHandler');

async function createUser(data) {
    // Check if email already exists
    const existingUser = await User.findOne({
        where: { email: data.email }
    });

    if (existingUser) {
        throw new AppError('Email already used', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Create user
    const newUser = await User.create(data);

    const { password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
}

async function addBookToShelf(userID, bookID) {
    // Check if user exists
    const user = await User.findByPk(userID);
    if (!user) {
        throw new AppError('User does not exist', 400);
    }

    // Check if book exists
    const book = await Book.findByPk(bookID);
    if (!book) {
        throw new AppError('Book does not exist', 400);
    }

    // Add book to user's shelf (using addBook native method)
    await user.addBook(book);

    // Get books in user's shelf (using getBooks native method)
    const books = await user.getBooks();

    return books;
}

module.exports = {
    createUser,
    addBookToShelf,
};