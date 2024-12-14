const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');

const CartProductModel = sequelize.define('CartProduct', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CartModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
});

CartModel.hasMany(CartProductModel, { foreignKey: 'cartId' });
ProductModel.hasMany(CartProductModel, { foreignKey: 'productId' });

CartProductModel.belongsTo(CartModel, { foreignKey: 'cartId' });
CartProductModel.belongsTo(ProductModel, { foreignKey: 'productId' });

module.exports = CartProductModel;
