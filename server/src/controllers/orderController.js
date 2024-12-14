const orderService = require("../services/orderService");

const orderController = {

    validateOrderController: async (req, res) => {try {

        const { userId, userName, userAddress } = req.body;

        if (!userId || !userName || !userAddress) {
            return res.status(400).json({
                error: "Les informations utilisateur manquent. Assurez-vous de fournir userId, userName et userAddress.",
            });
        }

        const result = await orderService.validateOrder(userId, userName, userAddress);

        res.status(201).json(result);
    } catch (error) {
        console.error("Erreur dans validateOrderController :", error);
        res.status(500).json({ error: error.message });
    }
}
}
module.exports = orderController;