// models/UserModel.entity.js
const bcrypt = require('bcrypt');
const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db.config');

class UserModelEntity extends Model {
    //username
    //email
    //password
    //firstname
    //lastname
}

UserModelEntity.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'Users',
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] },
        },
    },

});
UserModelEntity.prototype.validatePassword = async function (password) {
    if (!this.password) {
        throw new Error("Le mot de passe hashé est introuvable.");
    }
    console.log(await bcrypt.compare(password, this.password))
    return await bcrypt.compare(password, this.password);
};
module.exports = UserModelEntity;
