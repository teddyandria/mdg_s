const userService = require('../services/userService');
const jwt = require("jsonwebtoken");

const userController = {
    registration: async (req, res) => {
        try {
            const { username, email, password, lastname, firstname } = req.body;

            if (!username || !email || !password || !lastname || !firstname) {
                return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
            }

            const newUser = await userService.create({ username, email, password, lastname, firstname });
            res.status(200).json(newUser);

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const { success, user, error } = await userService.findOne(email);

            if (!success || !user) {
                return res.status(404).json({ message: error || "Utilisateur non trouvé." });
            }

            const isPasswordValid = await user.validatePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mot de passe incorrect." });
            }

            // Générer le token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Connexion réussie.",
                token
            });
        } catch (error) {
            console.error("Erreur interne :", error);
            return res.status(500).json({ message: "Erreur interne du serveur." });
        }
    },

    profile: async (req, res) => {
        try {

            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Token manquant." });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const { success, user } = await userService.findOneById(decoded.id);

            if (!success || !user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }

            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
            });
        } catch (e) {
            console.error("Erreur lors de la récupération du profil :", e);

            if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Token invalide ou expiré." });
            }

            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    },
    fictitiousLogin: async (req, res) => {
    try {
        const fictitiousUserId = 1; // ID de l'utilisateur fictif
        const fictitiousUser = await UserModel.findOne({ where: { id: fictitiousUserId } });

        if (!fictitiousUser) {
            return res.status(404).json({ message: "Utilisateur fictif introuvable." });
        }

        // Génération d'un token
        const token = jwt.sign(
            { id: fictitiousUser.id, email: fictitiousUser.email },
            "yourSecretKey", // Remplacez par votre clé secrète
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                id: fictitiousUser.id,
                email: fictitiousUser.email,
                username: fictitiousUser.username,
                firstname: fictitiousUser.firstname,
                lastname: fictitiousUser.lastname,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}

module.exports = userController;