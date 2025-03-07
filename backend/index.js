const express = require('express');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT;

// Middleware for JSON requests
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Welcome on MyLibrary!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server live on http://localhost:${PORT}`);
});