// const userService = require('../services/user.service.js');

async function createUser(req, res, next) {
    const data = req.body;
    res.send('Welcome on MyLibraaaaary!');
    res.status(201).json(newUser);
}

module.exports = {
    createUser,
  };