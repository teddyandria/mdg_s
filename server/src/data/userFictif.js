const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const initializeFictitiousUser = async () => {
    try {
        const fictitiousUserId = 1;
        const fictitiousUserData = {
            id: fictitiousUserId,
            username: "johndoe",
            email: "john@doe.com",
            password: "password1234",
            firstname: "John",
            lastname: "Doe",
        };

        const userExists = await UserModel.findOne({ where: { id: fictitiousUserId } });
        if (!userExists) {

            const salt = await bcrypt.genSalt(10);
            fictitiousUserData.password = await bcrypt.hash(fictitiousUserData.password, salt);

            await UserModel.create(fictitiousUserData);
            console.log("Utilisateur fictif créé avec succès dans la base de données !");
        } else {
            console.log("L'utilisateur fictif existe déjà.");
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'utilisateur fictif :", error);
    }
};

module.exports = initializeFictitiousUser;