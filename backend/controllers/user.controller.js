// const userService = require('../services/user.service.js');

async function createUser(req, res, next) {
    try {
        const data = req.body;
        res.send('Creating a user!');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
};