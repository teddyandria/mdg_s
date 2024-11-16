const userService = require('../services/userService');
const res = require("express/lib/response");

const userController = {
    createUser: async (req, res) => {
        try{
            const {username, email, password, lastname, firstname} = req.body;

            if(!username || !email || !password || !lastname || !firstname){
                return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
            }

            const newUser = await userService.create({username, email, password, lastname, firstname});
            res.status(200).json(newUser);

        } catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = userController;