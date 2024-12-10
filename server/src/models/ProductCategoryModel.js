const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ProductCategory = sequelize.define('ProductCategory', {
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
    tableName: 'ProductCategories',
    timestamps: false,
})

module.exports = ProductCategory