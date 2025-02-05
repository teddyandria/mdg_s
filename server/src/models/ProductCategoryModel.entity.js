const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db.config');

class ProductCategoryEntity extends Model {}

ProductCategoryEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    tableName: 'ProductCategories',
    timestamps: false,
})

module.exports = ProductCategoryEntity