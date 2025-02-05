const { DataTypes, Model} = require("sequelize");
const sequelize = require("../config/db.config");
//const {sequelize} = require("./index"); // Connexion à la base de données

class OrderItemEntity extends Model {}

OrderItemEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},{
    sequelize,
    tableName: "OrderItem",
});

module.exports = OrderItemEntity;