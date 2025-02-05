const Order = require("../models/OrderModel.entity");
const OrderItem = require("../models/OrderItemModel.entity");
const CartModel = require("../models/CartModel.entity");
const CartProductModel = require("../models/CartProductModel.entity");
const ProductModel = require("../models/ProductModel.entity");

const orderService = {


validateOrder: async (userId, userName, userAddress) => {
    try {
        const cart = await CartModel.findOne({ where: { userId } });

        if (!cart) {
            throw new Error("Aucun panier trouvé pour cet utilisateur.");
        }

        const cartItems = await CartProductModel.findAll({
            where: { cartId: cart.id },
            include: [
                {
                    model: ProductModel,
                    attributes: ["name", "price"],
                },
            ],
            order: [['id', 'ASC']],
        });
        if (cartItems.length === 0) {
            throw new Error("Votre panier est vide. Ajoutez des articles avant de passer une commande.");
        }

        let totalPrice = 0;
        cartItems.forEach((item) => {
            console.log("Cart Item:", {
                priceFromProduct: item.Product?.price,
                priceFromCartProduct: item.price,
                quantity: item.quantity,
            });

            const price = parseFloat(item.dataValues.price) || parseFloat(item.dataValues.price) || 0;
            const quantity = parseInt(item.dataValues.quantity) || 0;

            if (price <= 0 || quantity <= 0) {
                throw new Error("Invalid item data: Price or quantity is invalid.");
            }

            totalPrice += price * quantity;
            return {
                orderId: null,
                productId: item.dataValues.id,
                name: item.dataValues.name,
                quantity,
                price,
            };
        });

        const newOrder = await Order.create({
            userId,
            userName,
            userAddress,
            totalPrice: isNaN(totalPrice) ? 0 : totalPrice,
            deliveryDate: new Date(),
            deliveryNoteGenerated: true,
        });

        const orderItemsData = cartItems.map((item) => ({
            orderId: newOrder.id,
            productId: item.productId,
            name: item.Product?.name,
            quantity: parseInt(item.quantity) || 0,
            price: parseFloat(item.Product?.price) || 0,
        }));
        await OrderItem.bulkCreate(orderItemsData);

        await CartProductModel.destroy({ where: { cartId: cart.id } });

        return {
            message: "Commande validée avec succès.",
            order: {
                id: newOrder.id,
                userId: newOrder.userId,
                userName: newOrder.userName,
                userAddress: newOrder.userAddress,
                totalPrice: newOrder.totalPrice,
                deliveryDate: newOrder.deliveryDate,
                items: orderItemsData,
            },
        };
    } catch (error) {
        console.error("Erreur lors de la validation de la commande :", error);
        throw error;
    }
}
}

module.exports = orderService;