const userService = require('../services/user.service.js');

async function createUser(req, res, next) {
    try {
        const data = req.body;
        await userService.createUser(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
};