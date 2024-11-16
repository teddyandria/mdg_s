const sequelize = require('../config/db.config');
const User = require('./userModel');
// const Product = require('./product');
// const Order = require('./order');
// User.hasMany(Order);  // Exemple d'association

sequelize.sync({ alter: true });

module.exports = {
    sequelize,
    User,
};