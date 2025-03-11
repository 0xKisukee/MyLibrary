const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const auth = require("../middlewares/authentication")

// Base routes
router.post(
    '/create',
    auth.authenticateJwt,
    auth.isAdmin,
    bookController.createBook
);

router.get(
    '/all',
    auth.authenticateJwt,
    auth.handleJwtErrors,
    bookController.getAllBooks
);

module.exports = router;