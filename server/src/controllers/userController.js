const userService = require('../services/userService');
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
    registration: async (req, res) => {
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
    },

    login: async function (req, res) {
        const { email, password } = req.body;

        try{
            // Check user email in base
            const user = await userService.findOne(email);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            // Check if password stored in base and the given password are the same

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }

            // Generate token that expire 1h later
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Connexion réussie',
                token,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }
}

module.exports = userController;