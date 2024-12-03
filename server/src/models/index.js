const sequelize = require('../config/db.config');
const User = require('./userModel');
const Product = require('./ProductModel');
const ProductCategory = require('./ProductCategoryModel');

module.exports = {
    sequelize,
    User,
    Product,
    ProductCategory,
};
