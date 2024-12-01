const { User } = require('../models');

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
           const user = await User.findOne({where : {email: email}})
            if(!user){
                return { success: false, error: 'Utilisateur introuvable.' };
            }
            return { success: true, user };
        } catch(e){
            console.error(e);
            return { success: false, error: 'Utilisateur non trouvé.' };
        }
    }
}

module.exports = userService;