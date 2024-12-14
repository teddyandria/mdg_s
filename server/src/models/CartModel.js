const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const UserModel = require('../models/userModel');

const CartModel = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

CartModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasOne(CartModel, { foreignKey: 'userId' });

module.exports = CartModel;