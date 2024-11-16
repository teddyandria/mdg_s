const { User } = require('../models');

const userService = {
    findAll: async () => {
        return await User.findAll();
    },

    create: async (data) => {
        try {
        return await User.create(data);
        } catch(e){
            console.error(e);
        }
    }
}

module.exports = userService;