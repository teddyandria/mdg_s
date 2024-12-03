const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const ProductCategory = require('../models/ProductCategoryModel');

const ProductModel = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    photos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ProductCategory,
            key: 'id',
        },
    },
})

ProductModel.associate = function (models) {
    ProductModel.belongsTo(ProductCategory, { foreignKey: 'categoryId', as: 'category' });
    ProductCategory.hasMany(ProductModel, { foreignKey: 'categoryId', as: 'products' });
}



module.exports = ProductModel