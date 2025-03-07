const express = require('express');
require('dotenv').config();
// Import routes
const userRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/book.route');
// Import tables creation
const sequelize = require('./database');
// Import error middleware
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT;

// Middleware for JSON requests
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Welcome on MyLibrary!');
});

// Use error middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server live on http://localhost:${PORT}.`);
});

// Create tables in database
(async () => {
    require("./models");
    await sequelize.sync({ force: true/*, logging: console.log*/ });
    console.log('Tables successfully created.');
})();