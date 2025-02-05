const CartModel = require('../models/CartModel.entity');
const ProductModel = require('../models/ProductModel.entity');
const CartProductModel = require('../models/CartProductModel.entity');
const UserModel = require('../models/UserModel.entity');

const cartService = {
    addToCart: async (userId, productId, quantity) => {
        try {
            const userExists = await UserModel.findOne({ where: { id: userId } });
            if (!userExists) {
                return {
                    success: false,
                    message: `L'utilisateur avec l'id ${userId} n'existe pas dans la base de données.`
                };
            }

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
                success: true,
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

            return cart.dataValues.CartProductModelEntities.map((cartProduct) => ({
                id: cartProduct.dataValues.ProductModelEntity.dataValues.id,
                name: cartProduct.dataValues.ProductModelEntity.dataValues.name,
                price: cartProduct.dataValues.ProductModelEntity.dataValues.price,
                photos: cartProduct.dataValues.ProductModelEntity.dataValues.photos,
                quantity: cartProduct.dataValues.ProductModelEntity.dataValues.quantity,
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
