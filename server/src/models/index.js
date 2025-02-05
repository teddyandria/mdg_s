const sequelize = require('../config/db.config');
const UserModelEntity = require('./UserModel.entity');
const Product = require('./ProductModel.entity');
const ProductCategory = require('./ProductCategoryModel.entity');
const CartModel = require('./CartModel.entity');
const CartProductModel = require('./CartProductModel.entity');

// UserModelEntity.init({}, { sequelize });
// Product.init({}, { sequelize });
// ProductCategory.init({}, { sequelize });
// CartModel.init({}, { sequelize });
// CartProductModel.init({}, { sequelize });

module.exports = {
    sequelize,
    UserModelEntity,
    Product,
    ProductCategory,
    CartModel,
    CartProductModel
};
