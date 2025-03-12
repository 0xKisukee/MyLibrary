const express = require('express');
require('dotenv').config();
const cors = require('cors');
// Import routes
const userRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/book.route');
// Import tables creation
const sequelize = require('./database');
// Import error middleware
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT;

// Authorize requests from frontend
app.use(cors({
    origin: 'http://localhost:8080', // Frontend
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Middleware for JSON requests
app.use(express.json());

//Serve static files of frontend
app.use(express.static('../frontend'));

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

// Create tables in database and admin user
(async () => {
    const { User } = require("./models");
    const bcrypt = require('bcrypt');

    await sequelize.sync({ force: true/*, logging: console.log*/ });
    console.log('Tables successfully created.');

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PWD, 10);
    await User.create(
        {
            "username": process.env.ADMIN_USERNAME,
            "email": process.env.ADMIN_EMAIL,
            "password": hashedPassword,
            "role": "admin"
        }
    );
})();