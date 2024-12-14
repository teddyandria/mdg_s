const sequelize = require('../config/db');
const User = require('./userModel');
const Product = require('./ProductModel');
const ProductCategory = require('./ProductCategoryModel');
const CartModel = require('./cartModel');
const CartProductModel = require('./cartProductModel');



module.exports = {
    sequelize,
    User,
    Product,
    ProductCategory,
    CartModel,
    CartProductModel
};
