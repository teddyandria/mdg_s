// models/userModel.js
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const UserModel = sequelize.define('User', {
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
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});
// UserModel.prototype.validatePassword = async function (password) {
//     if (!this.password) {
//         throw new Error("Le mot de passe hashé est introuvable.");
//     }
//     return await bcrypt.compare(password, this.password);
// }
module.exports = UserModel;
