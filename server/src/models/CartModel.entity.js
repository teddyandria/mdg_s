const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db.config');
const UserModel = require('./UserModel.entity');
//const {sequelize} = require("./index");

class CartModelEntity extends Model {}

CartModelEntity.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
},{
    sequelize,
    tableName: 'Carts',
});

CartModelEntity.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasOne(CartModelEntity, { foreignKey: 'userId' });

module.exports = CartModelEntity;