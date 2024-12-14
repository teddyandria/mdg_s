const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const CartProductModel = require('../models/CartProductModel');

const cartService = {
    addToCart: async (userId, productId, quantity) => {
        try {
            let cart = await CartModel.findOne({
                where: { userId }
            });

            if (!cart) {
                cart = await CartModel.create({ userId });
            }

            let cartProduct = await CartProductModel.findOne({
                where: { cartId: cart.id, productId }
            });

            if (cartProduct) {

                cartProduct.quantity += quantity;
                await cartProduct.save();
            } else {
                await CartProductModel.create({
                    cartId: cart.id,
                    productId,
                    quantity
                });
            }

            return {
                message: 'Produit ajouté au panier avec succès.',
            };
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit au panier :', error);
            throw new Error('Erreur lors de l\'ajout du produit au panier.');
        }
    },

    getCartItems: async (userId) => {
        try {
            const cart = await CartModel.findOne({
                where: { userId: userId },
                include: [{
                    model: CartProductModel,
                    attributes: ['quantity'],
                    include: [{
                        model: ProductModel,
                        attributes: ['id', 'name', 'price', 'photos'],
                    }],
                }],
            });

            if (!cart) {
                return { message: 'Aucun panier trouvé.' };
            }

            return cart.CartProducts.map((cartProduct) => ({
                id: cartProduct.Product.id,
                name: cartProduct.Product.name,
                price: cartProduct.Product.price,
                photos: cartProduct.Product.photos,
                quantity: cartProduct.quantity, // Quantité issue de CartProductModel
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des articles du panier :', error);
            throw new Error('Erreur lors de la récupération des articles du panier.');
        }
    },
    deleteFromCart: async (userId, productId) => {
        try {
            const cart = await CartModel.findOne({
                where: { userId }
            });

            if (!cart) {
                throw new Error('Aucun panier trouvé pour cet utilisateur.');
            }

            const cartProduct = await CartProductModel.findOne({
                where: { cartId: cart.id, productId }
            });

            if (!cartProduct) {
                throw new Error('Produit non trouvé dans le panier.');
            }

            await cartProduct.destroy();

            return {
                message: 'Produit supprimé du panier avec succès.'
            };
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier :', error);
            throw new Error('Erreur lors de la suppression du produit du panier.');
        }
    },
    updateCartItemQuantity: async (userId, productId, newQuantity) => {
        try {
            const cart = await CartModel.findOne({
                where: { userId }
            });

            if (!cart) {
                throw new Error("Le panier n'existe pas pour cet utilisateur.");
            }

            const cartProduct = await CartProductModel.findOne({
                where: { cartId: cart.id, productId }
            });

            if (!cartProduct) {
                throw new Error("Ce produit n'existe pas dans le panier.");
            }

            // Met à jour la quantité demandée
            cartProduct.quantity = newQuantity;
            await cartProduct.save();

            return {
                message: 'Quantité mise à jour avec succès.',
            };
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la quantité :", error);
            throw new Error("Erreur lors de la mise à jour de la quantité de l'article.");
        }
    },
};

module.exports = cartService;