const sequelize = require('../config/db.config');
const User = require('./userModel');
const Product = require('./ProductModel');
const ProductCategory = require('./ProductCategoryModel');

// Product.associate = () => {
//     Product.belongsTo(ProductCategory, { foreignKey: 'categoryId', as: 'category' });
// };
//
// ProductCategory.associate = () => {
//     ProductCategory.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
// };
//
// Product.associate();
// ProductCategory.associate();

module.exports = {
    sequelize,
    User,
    Product,
    ProductCategory,
};
