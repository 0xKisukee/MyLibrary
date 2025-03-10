const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require("../middlewares/authentication")

// Public routes
router.post('/create', userController.createUser);
router.post('/login', userController.login);

// Protected routes
router.post(
    '/:userID/addBookToShelf/:bookID',
    auth.authenticateJwt,
    auth.isOwnResource,
    userController.addBookToShelf
);

router.get(
    '/:userID/shelf',
    auth.authenticateJwt,
    auth.isOwnResource,
    userController.getUserShelf
);

// Admin routes

module.exports = router;