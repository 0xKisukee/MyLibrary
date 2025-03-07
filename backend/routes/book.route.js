const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Base routes
router.post('/', bookController.createBook);

module.exports = router;