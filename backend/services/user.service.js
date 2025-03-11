require('dotenv').config();
const { User, Book } = require("../models");
const { AppError } = require('../middlewares/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(data) {
    // Check if email already exists
    const existingUser = await User.findOne({
        where: { email: data.email }
    });

    if (existingUser) {
        throw new AppError('Email already used', 400);
    }

    // Create user (can't be admin => force role to customer)
    data.role = "customer";
    const newUser = await User.create(data);

    const { password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
}

async function login(data) {
    const { email, password } = data;

    // Get user with email
    const user = await User.findOne({
        where: { email }
    });

    // Check if user exists
    if (!user) {
        throw new AppError('Wrong email', 400);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Wrong password', 401);
    }

    // Generate JWT token with user infos
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role // 'admin' or 'customer'
        },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
    );

    return {
        token,
        user: {
            userId: user.id,
            email: user.email,
            role: user.role
        }
    };
}

async function updateUserRole(userID, role) {
    // Check if user exists
    const user = await User.findByPk(userID);
    if (!user) {
        throw new AppError('User does not exist', 400);
    }
    
    // Update role
    user.role = role;
    await user.save();
    
    // Retourner l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = user.toJSON();
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
    const books = await user.getBooks({
        joinTableAttributes: []
    });

    return books;
}

async function getUserShelf(userID) {
    // Check if user exists
    const user = await User.findByPk(userID);
    if (!user) {
        throw new AppError('User does not exist', 400);
    }

    // Get books in user's shelf (using getBooks native method)
    const books = await user.getBooks({
        joinTableAttributes: []
    });

    return books;
}

module.exports = {
    createUser,
    addBookToShelf,
    getUserShelf,
    login,
    updateUserRole,
};