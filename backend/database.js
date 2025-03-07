const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connect to DB with Sequelize
const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    logging: false
});

module.exports = sequelize;