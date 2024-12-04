const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const ProductModel = require("../models/ProductModel");

const ProductCategory = sequelize.define('ProductCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})



module.exports = ProductCategory