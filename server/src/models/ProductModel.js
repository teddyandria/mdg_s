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
    }
})

module.exports = ProductModel