const { User } = require('../models');
const bcrypt = require("bcrypt");

const userService = {

    create: async (data) => {
        try {
         const user = await User.create(data);
         return { success: true, user };
        } catch(e){
            console.error(e);
            return { success: false, error: 'Failed to create user.' };
        }
    },

    findOne: async (email) => {
        try{
           const user = await User.findOne({
               where : {email: email},
               attributes: ['id', 'email', 'username', 'password', 'firstname', 'lastname'],
               raw: true
           })
            if(!user){
                return { success: false, error: 'Utilisateur introuvable.' };
            }
            return { success: true, user };
        } catch(e){
            console.error(e);
            return { success: false, error: 'Utilisateur non trouvé.' };
        }
    },

    validatePassword: async function (userPassword, inputPassword) {
        console.log({userPassword, inputPassword})
        if (!userPassword) {
            throw new Error("Le mot de passe hashé est introuvable.");
        }
        return await bcrypt.compare(inputPassword, userPassword);
    }
}
module.exports = userService;