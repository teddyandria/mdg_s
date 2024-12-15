const cartService = require('../services/cartService');

const cartController = {

    addProductToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            const result = await cartService.addToCart(userId, productId, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            console.log(`ID utilisateur reçu : ${userId}`);
            if (!userId) {
                return res.status(400).json({ error: "L'ID de l'utilisateur est requis." });
            }
            const cartItems = await cartService.getCartItems(userId);
            if (!cartItems || cartItems.length === 0) {
                return res.status(404).json({ error: "Aucun article trouvé dans le panier pour cet utilisateur." });
            }
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProductFromCart: async (req, res) => {
        try {
            const { userId, productId } = req.params;
            const result = await cartService.deleteFromCart(userId, productId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProductQuantity: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;

            if (!userId || !productId || (typeof quantity === 'undefined')) {
                return res.status(400).json({ error: "userId, productId et quantity sont requis." });
            }

            const result = await cartService.updateCartItemQuantity(userId, productId, quantity);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = cartController;
