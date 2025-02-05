const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const ProductCategory = require('./ProductCategoryModel.entity');

class ProductModelEntity extends Model {}

ProductModelEntity.init({
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
}, {
    sequelize,
    tableName: 'Products',
});

// Relations
ProductModelEntity.belongsTo(ProductCategory, { foreignKey: 'categoryId', as: 'category' });
ProductCategory.hasMany(ProductModelEntity, { foreignKey: 'categoryId', as: 'products' });

module.exports = ProductModelEntity;
