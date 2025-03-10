const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Base routes
router.post('/', userController.createUser);
router.post('/:userID/addBookToShelf/:bookID', userController.addBookToShelf);

module.exports = router;