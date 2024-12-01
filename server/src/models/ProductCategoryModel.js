const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ProductCategoryModel = sequelize.define('ProductCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})

module.exports = ProductCategoryModel