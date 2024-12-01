const ProductModel = require('../models/ProductModel');
// const ProductCategoryModel = require('../models/ProductCategoryModel');

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
            return await ProductModel.findAll();
        } catch (error) {
            throw new Error('Erreur lors de la récupération des produits.');
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
    // getCategories: async () => {
    //     return await ProductCategoryModel.findAll({
    //         attributes: ["id", "name"],
    //     });
    // },
};

module.exports = productService;
