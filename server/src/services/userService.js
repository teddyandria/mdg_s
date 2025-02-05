const User = require('../models/UserModel.entity');
const bcrypt = require("bcrypt");

const userService = {
    create: async (data) => {

        try {
            const user = await User.create(data);
            return { success: true, user };
        } catch (e) {
            console.error(e);
            return { success: false, error: 'Failed to create user.' };
        }
    },

    findOne: async (email) => {
        try {
            const user = await User.scope("withPassword").findOne({
                where: { email: email },
                attributes: ['id', 'email', 'username', 'password', 'firstname', 'lastname'],
            });

            if (!user) {
                return { success: false, error: 'Utilisateur introuvable.' };
            }
            return { success: true, user };
        } catch (e) {
            console.error(e);
            return { success: false, error: 'Utilisateur non trouvé.' };
        }
    },

    findOneById: async (id) => {
        try {
            const user = await User.findByPk(id, {
                attributes: ['id', 'email', 'username', 'firstname', 'lastname'],
            });

            if (!user) {
                return { success: false, error: 'Utilisateur introuvable.' };
            }
            return { success: true, user };
        } catch (e) {
            console.error(e);
            return { success: false, error: 'Erreur lors de la recherche de l\'utilisateur.' };
        }
    },
};

module.exports = userService;