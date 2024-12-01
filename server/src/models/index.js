const sequelize = require('../config/db.config');
const User = require('./userModel');
const Product = require('./productModel');
const ProductCategory = require('./productCategoryModel');

Product.belongsTo(ProductCategory, {
    foreignKey: {
        name: 'ProductCategoryId',
        allowNull: false,
    },
    as: 'category'
})

ProductCategory.hasMany(Product, {
    foreignKey: 'ProductCategoryId',
    as: 'products'
})

sequelize.sync({ alter: true });

module.exports = {
    sequelize,
    User,
    Product,
    ProductCategory,
};
