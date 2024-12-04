const ProductModel = require('../models/ProductModel');
const ProductCategoryModel = require('../models/ProductCategoryModel');

const productService = {

    createProduct: async (data) => {
        try {
            return await ProductModel.create(data);
        } catch (error) {
            throw new Error('Erreur lors de la création du produit.');
        }
    },

    getAllProducts: async () => {
        try {
            const products = await ProductModel.findAll({
                include: [{
                    model: ProductCategoryModel,
                    as: 'category',
                    attributes: ['id', 'name'],
                }],
            });
            return products;
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            throw new Error('Impossible de récupérer les produits');
        }
    },


    deleteProduct: async (id) => {
        try {
            const result = await ProductModel.destroy({ where: { id } });
            if (!result) {
                return result;
            } else {
                throw new Error('Produit introuvable.');
            }
        } catch (error) {
            throw new Error('Erreur lors de la suppression du produit.');
        }
    },
    findOne: async (productId) => {
        try {

            const product = await ProductModel.findOne({
                where: { id: productId },
                include: [
                    {
                        model: ProductCategoryModel,
                        as: 'category',
                        attributes: ['name'],
                    },
                ],
            });

            return product;
        } catch (error) {
            console.error('Erreur lors de la récupération du produit :', error);
            throw new Error('Erreur lors de la récupération du produit.');
        }
    },
    getCategories: async () => {
        return await ProductCategoryModel.findAll({
            attributes: ["id", "name"],
        });
    },
};

module.exports = productService;
