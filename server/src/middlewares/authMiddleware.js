const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token manquant." });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next(); // Passe à la logique du contrôleur
    } catch (error) {
        console.error("Erreur d'auth middleware :", error);
        return res.status(403).json({ message: "Token invalide ou expiré." });
    }
};

module.exports = authMiddleware;