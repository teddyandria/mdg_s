const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

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
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photos: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = ProductModel