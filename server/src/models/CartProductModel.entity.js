const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db.config');
const CartModel = require('./CartModel.entity');
const ProductModel = require('./ProductModel.entity');
//const {sequelize} = require("./index");
class CartProductModelEntity extends Model {}
CartProductModelEntity.init({
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
},{
    sequelize,
    tableName: 'CartProduct',
});

CartModel.hasMany(CartProductModelEntity, { foreignKey: 'cartId' });
ProductModel.hasMany(CartProductModelEntity, { foreignKey: 'productId' });

CartProductModelEntity.belongsTo(CartModel, { foreignKey: 'cartId' });
CartProductModelEntity.belongsTo(ProductModel, { foreignKey: 'productId' });

module.exports = CartProductModelEntity;
