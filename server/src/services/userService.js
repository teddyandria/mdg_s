const { User } = require('../models');

const userService = {

    create: async (data) => {
        try {
        return await User.create(data);
        } catch(e){
            console.error(e);
        }
    },

    findOne: async (email) => {
        try{
        return await User.findOne({where : {email: email}})
        } catch(e){
            console.error(e);
        }
    }
}

module.exports = userService;