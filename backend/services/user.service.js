const { User } = require("../models");
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

module.exports = {
    createUser,
};