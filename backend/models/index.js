// Import models
const User = require('./user.model');
const Book = require('./book.model');

User.belongsToMany(Book, { through: 'shelves' });
Book.belongsToMany(User, { through: 'shelves' });

// Export all models
module.exports = {
  User,
  Book,
};