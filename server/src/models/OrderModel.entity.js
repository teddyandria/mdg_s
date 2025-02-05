const { DataTypes, Model} = require("sequelize");
const sequelize = require("../config/db.config");
const OrderItem = require("./OrderItemModel.entity");
//const {sequelize} = require("./index");

class OrderEntity extends Model {}

OrderEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "En cours",
    },

    deliveryDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deliveryNoteGenerated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},{
    sequelize,
    tableName: "Order",
});

OrderEntity.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(OrderEntity, { foreignKey: "orderId" });

module.exports = OrderEntity;